import React, { createContext, useState } from 'react'

import { models, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { formatFilename } from 'src/helpers/formatFilename'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'

const {
  document: { Qualification },
  file: { uploadFileWithConflictStrategy }
} = models

const FormDataContext = createContext()

const FormDataProvider = ({ children }) => {
  const client = useClient()
  const { f, t } = useI18n()
  const scannerT = useScannerI18n()
  const {
    currentDefinition,
    stepperDialogTitle,
    setIsStepperDialogOpen
  } = useStepperDialog()
  const { featureDate, label } = currentDefinition || {}
  const [formData, setFormData] = useState({
    metadata: {},
    data: []
  })

  const formSubmit = () => {
    const qualification = Qualification.getByLabel(stepperDialogTitle)
    const { metadata } = formData
    ;(async () => {
      try {
        // (1/2) For the moment, the current user is the only possible choice
        const user = await fetchCurrentUser(client)
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
          const date =
            formData.metadata[featureDate] &&
            f(formData.metadata[featureDate], 'YYYY.MM.DD')

          const fileRenamed = formatFilename({
            name: file.name,
            qualificationName: scannerT(`items.${label}`),
            pageName: fileMetadata.page,
            username: user?.fullname,
            date
          })

          await uploadFileWithConflictStrategy(client, file, {
            name: fileRenamed,
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
