import React, { createContext, useState } from 'react'
import { PDFDocument } from 'pdf-lib'

import { models, useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { formatFilename } from 'src/helpers/formatFilename'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import { CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/doctypes'

const {
  document: { Qualification },
  file: { uploadFileWithConflictStrategy }
} = models

const FormDataContext = createContext()

const audioToBase64 = async audioFile => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onerror = reject
    reader.onload = e => resolve(e.target.result)
    reader.readAsDataURL(audioFile)
  })
}
// FIX For testing (to deleted)
const downloadFile = (data, fileName) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  document.body.appendChild(a)

  a.href = window.URL.createObjectURL(
    new Blob([data], { type: 'application/pdf' })
  )
  a.setAttribute('download', fileName)
  a.click()

  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}

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
        const pdfDoc = await PDFDocument.create()
        // (1/2) For the moment, the current user is the only possible choice
        const user = await fetchCurrentUser(client)
        const { _id: appFolderID } = await getOrCreateAppFolderWithReference(
          client,
          t
        )
        const fileCollection = client.collection(FILES_DOCTYPE)
        const reference = {
          _id: user._id,
          _type: CONTACTS_DOCTYPE
        }

        for (const { file, fileMetadata } of formData.data) {
          if (file.type !== 'application/pdf') {
            const fileB64 = await audioToBase64(file)
            let img
            if (file.type === 'image/png') img = await pdfDoc.embedPng(fileB64)
            if (file.type === 'image/jpeg') img = await pdfDoc.embedJpg(fileB64)
            const imgScaled = img.scale(0.5)
            const page = pdfDoc.addPage()
            const { width: pageWidth, height: pageHeight } = page.getSize()
            page.drawImage(img, {
              x: pageWidth / 2 - imgScaled.width / 2,
              y: pageHeight / 2 - imgScaled.height / 2,
              width: imgScaled.width,
              height: imgScaled.height
            })
          }

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
            pageName: fileMetadata.page
              ? t(`PapersList.label.${fileMetadata.page}`)
              : null,
            username: user?.fullname,
            date
          })

          const { data: fileCreated } = await uploadFileWithConflictStrategy(
            client,
            file,
            {
              name: fileRenamed,
              contentType: file.type,
              metadata: newMetadata,
              dirId: appFolderID,
              conflictStrategy: 'rename'
            }
          )
          // (2/2) So this user is referenced as a contact on the new papers
          await fileCollection.addReferencedBy(fileCreated, [reference])
        }
        const pdfBytes = await pdfDoc.save()
        // FIX For testing (to deleted)
        downloadFile(pdfBytes, 'pdf-lib_example.pdf')

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
