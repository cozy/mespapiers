import React, { createContext, useState } from 'react'

import { models, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import getOrCreateAppFolderWithReference from 'src/utils/getFolderWithReference'
import { FILES_DOCTYPE } from 'src/doctypes'

const { Qualification } = models.document

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

        await client.create(FILES_DOCTYPE, {
          data: file,
          metadata: { qualification: newQualification },
          dirId: appFolderID
        })
        setIsStepperDialogOpen(false)
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
