import React, { createContext, useState } from 'react'

import { models, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'

const {
  document: { Qualification },
  file: { uploadFileWithConflictStrategy }
} = models

const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
  const client = useClient()
  const { t } = useI18n()
  const {
    currentDefinition,
    stepperDialogTitle,
    setIsStepperDialogOpen
  } = useStepperDialog()
  const { featureDate } = currentDefinition || {}
  const [formData, setFormData] = useState({
    metadata: {},
    data: []
  })

  const formSubmit = () => {
    const qualification = Qualification.getByLabel(stepperDialogTitle)
    const { metadata } = formData
    ;(async () => {
      try {
        const { _id: appFolderID } = await getOrCreateAppFolderWithReference(
          client,
          t
        )

        for (const { file, fileMetadata } of formData.data) {
          const newMetadata = {
            qualification: {
              ...qualification,
              ...fileMetadata,
              ...metadata,
              featureDate
            }
          }

          await uploadFileWithConflictStrategy(client, file, {
            name: file.name,
            contentType: file.type,
            metadata: newMetadata,
            dirId: appFolderID,
            conflictStrategy: 'rename'
          })
        }

        Alerter.success(t('common.saveFile.success'))
      } catch (error) {
        Alerter.error(t(`common.saveFile.error`))
      }
      setIsStepperDialogOpen(false)
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
