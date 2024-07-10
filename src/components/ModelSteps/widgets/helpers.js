import merge from 'lodash/merge'
import { PDFDocument } from 'pdf-lib'
import { FILES_DOCTYPE } from 'src/constants'

import { addFileToPdf } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/helpers'

export const updateMetadata = (formData, file) => {
  const formMetadata = formData.metadata[FILES_DOCTYPE]
  const fileMetadata = file.metadata
  const updatedMetadata = merge({}, fileMetadata, formMetadata)

  return updatedMetadata
}

export const removeIsBlank = metadata => {
  if (!metadata.paperProps) return

  if (metadata.paperProps.isBlank != null) {
    delete metadata.paperProps.isBlank
  }
  if (Object.keys(metadata.paperProps).length === 0) {
    delete metadata.paperProps
  }
}

export const createPDFBytes = async formData => {
  let pdfDoc = await PDFDocument.create()
  let pdfBytes

  for (let idx = 0; idx < formData.data.length; idx++) {
    pdfBytes = await addFileToPdf(pdfDoc, formData.data[idx].file)
  }

  return pdfBytes
}
