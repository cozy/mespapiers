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

const fileToBase64 = async audioFile => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onerror = reject
    reader.onload = e => resolve(e.target.result)
    reader.readAsDataURL(audioFile)
  })
}

const loadPdfFromFile = async file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onerror = reject
    reader.onload = e => resolve(new Uint8Array(e.target.result))
    reader.readAsArrayBuffer(file)
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

const addImageToPdf = async ({ pdf, fileToAdd }) => {
  const fileB64 = await fileToBase64(fileToAdd)
  let img
  if (fileToAdd.type === 'image/png') img = await pdf.embedPng(fileB64)
  if (fileToAdd.type === 'image/jpeg') img = await pdf.embedJpg(fileB64)
  const imgScaled = img.scale(0.5)
  const page = pdf.addPage()
  const { width: pageWidth, height: pageHeight } = page.getSize()
  page.drawImage(img, {
    x: pageWidth / 2 - imgScaled.width / 2,
    y: pageHeight / 2 - imgScaled.height / 2,
    width: imgScaled.width,
    height: imgScaled.height
  })
}

const addPdfToPdf = async ({ pdf, fileToAdd }) => {
  const pdfToAdd = await loadPdfFromFile(fileToAdd)

  const document = await PDFDocument.load(pdfToAdd)

  const copiedPages = await pdf.copyPages(document, document.getPageIndices())
  copiedPages.forEach(page => pdf.addPage(page))
}

const addFileToPdf = async ({ pdf, fileToAdd }) => {
  if (fileToAdd.type === 'application/pdf') {
    await addPdfToPdf({ pdf, fileToAdd })
  } else {
    await addImageToPdf({ pdf, fileToAdd })
  }
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
        let pdfDoc = await PDFDocument.create()
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
          await addFileToPdf({
            pdf: pdfDoc,
            fileToAdd: file
          })

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

          const pdfBytes = await pdfDoc.save()

          const { data: fileCreated } = await uploadFileWithConflictStrategy(
            client,
            pdfBytes,
            {
              name: fileRenamed,
              contentType: 'application/pdf',
              metadata: newMetadata,
              dirId: appFolderID,
              conflictStrategy: 'rename'
            }
          )
          // (2/2) So this user is referenced as a contact on the new papers
          await fileCollection.addReferencedBy(fileCreated, [reference])

          pdfDoc = await PDFDocument.create()
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
