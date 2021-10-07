import React, { createContext, useState } from 'react'

import { models, useClient } from 'cozy-client'
import { CozyFile } from 'cozy-doctypes'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import getOrCreateAppFolderWithReference from 'src/utils/getFolderWithReference'
import { FILES_DOCTYPE } from 'src/doctypes'

const { Qualification } = models.document
const HTTP_CODE_CONFLICT = 409

const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
  const client = useClient()
  const { t } = useI18n()
  const {
    currentDefinition,
    stepperDialogTitle,
    setIsStepperDialogOpen
  } = useStepperDialogContext()
  const { featureDate } = currentDefinition || {}
  const [formData, setFormData] = useState({
    metadata: {},
    data: []
  })

  const formSubmit = () => {
    const qualification = Qualification.getByLabel(stepperDialogTitle)
    const { metadata } = formData

    ;(async () => {
      let submitSucceeded = null
      for (const { file, fileMetadata } of formData.data) {
        const newQualification = {
          ...qualification,
          ...fileMetadata,
          ...metadata,
          featureDate
        }

        const { _id: appFolderID } = await getOrCreateAppFolderWithReference(
          client,
          t
        )

        try {
          await client.create(FILES_DOCTYPE, {
            data: file,
            metadata: { qualification: newQualification },
            dirId: appFolderID
          })
          if (submitSucceeded === null) submitSucceeded = true
        } catch (err) {
          const objError = JSON.parse(JSON.stringify(err))
          if (objError.status === HTTP_CODE_CONFLICT) {
            const { filename, extension } = CozyFile.splitFilename({
              name: file.name,
              type: 'file'
            })
            const newFilename = CozyFile.generateNewFileNameOnConflict(filename)
            const newFilenameWithExt = `${newFilename}${extension}`
            const blob = file.slice(0, file.size, file.type)
            const renamedFile = new File([blob], newFilenameWithExt, {
              type: file.type
            })

            try {
              await client.create(FILES_DOCTYPE, {
                data: renamedFile,
                metadata: { qualification: newQualification },
                dirId: appFolderID
              })
              if (submitSucceeded === null) submitSucceeded = true
            } catch (err) {
              submitSucceeded = false
              break
            }
          } else {
            submitSucceeded = false
            break
          }
        }
      }
      setIsStepperDialogOpen(false)
      if (submitSucceeded) {
        Alerter.success(t('common.saveFile.success'))
      } else {
        Alerter.error(t(`common.saveFile.error`))
      }
    })()
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData, formSubmit }}>
      {children}
    </FormDataContext.Provider>
  )
}

export default FormDataContext

export { FormDataProvider }
