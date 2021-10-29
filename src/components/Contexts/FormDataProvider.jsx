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

const savePdfToCozy = async ({
  pdf,
  pdfMetadata,
  formMetadata,
  currentDefinition,
  qualification,
  user,
  fileCollection,
  f,
  t,
  scannerT,
  appFolderID,
  client
}) => {
  const { featureDate, label } = currentDefinition || {}

  const reference = {
    _id: user._id,
    _type: CONTACTS_DOCTYPE
  }

  const newMetadata = {
    qualification: {
      ...qualification,
      ...pdfMetadata,
      ...formMetadata,
      featureDate
    }
  }

  const date =
    formMetadata[featureDate] && f(formMetadata[featureDate], 'YYYY.MM.DD')

  const fileRenamed = formatFilename({
    name: 'NOT_USED_NAME.pdf',
    qualificationName: scannerT(`items.${label}`),
    pageName: pdfMetadata.page
      ? t(`PapersList.label.${pdfMetadata.page}`)
      : null,
    username: user?.fullname,
    date
  })

  const pdfBytes = await pdf.save()

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

  // The user is referenced as a contact on the new papers
  await fileCollection.addReferencedBy(fileCreated, [reference])
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
        const fileCollection = client.collection(FILES_DOCTYPE)

        let pdfDoc = await PDFDocument.create()
        const isMultiPage = formData.data.some(
          ({ fileMetadata }) => fileMetadata.multipage
        )

        for (const { file, fileMetadata } of formData.data) {
          await addFileToPdf({
            pdf: pdfDoc,
            fileToAdd: file
          })

          if (!isMultiPage) {
            await savePdfToCozy({
              pdf: pdfDoc,
              pdfMetadata: fileMetadata,
              formMetadata: metadata,
              currentDefinition,
              qualification,
              user,
              fileCollection,
              appFolderID,
              f,
              t,
              scannerT,
              client
            })

            pdfDoc = await PDFDocument.create()
          }
        }

        if (isMultiPage) {
          await savePdfToCozy({
            pdf: pdfDoc,
            pdfMetadata: {},
            formMetadata: metadata,
            currentDefinition,
            qualification,
            user,
            fileCollection,
            appFolderID,
            f,
            t,
            scannerT,
            client
          })
        }

        Alerter.success(t('common.saveFile.success'))
      } catch (error) {
        console.error(error)
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
