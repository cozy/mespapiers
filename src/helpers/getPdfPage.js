import { PDFDocument } from 'pdf-lib'
import { FILES_DOCTYPE } from 'src/constants'

/**
 * @param {object} param
 * @param {PDFDocument} param.pdfDoc - PDF document
 * @param {number} param.pageIndex - Index of page to get
 * @returns {Promise<Uint8Array>} - Binary of the new PDF file
 */
const handlePdfPage = async ({ pdfDoc, pageIndex }) => {
  const newPdfDoc = await PDFDocument.create()
  const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex])
  newPdfDoc.addPage(copiedPage)

  return newPdfDoc.save()
}

/**
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - CozyClient instance
 * @param {import('cozy-client/types/types').IOCozyFile} param.file - io.cozy.file
 * @returns {Promise<PDFDocument>} - PDF document
 */
const loadPdfDoc = async ({ client, file }) => {
  const fileColl = client.collection(FILES_DOCTYPE)
  const fileBin = await fileColl.fetchFileContentById(file._id)
  const arrayBuffer = await fileBin.arrayBuffer()

  return PDFDocument.load(arrayBuffer)
}

/**
 * Get the expected page of a PDF file
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - CozyClient instance
 * @param {import('cozy-client/types/types').IOCozyFile} param.file - io.cozy.file
 * @param {number} param.pageIndex - Index of page to get
 * @returns {Promise<Uint8Array>} - Binary of the new PDF file
 */
export const getPdfPage = async ({ client, file, pageIndex }) => {
  const pdfDoc = await loadPdfDoc({ client, file })

  return handlePdfPage({ pdfDoc, pageIndex })
}

/**
 * Get all the pages of a PDF file in binary format
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - CozyClient instance
 * @param {import('cozy-client/types/types').IOCozyFile} param.file - io.cozy.file
 * @returns {Promise<Uint8Array[]>} - Array with the various PDF pages in binary format
 */
export const getAllPdfPages = async ({ client, file }) => {
  const pdfDoc = await loadPdfDoc({ client, file })
  const pageBinaries = []

  for (let idx = 0; idx < pdfDoc.getPageCount(); idx++) {
    const pdfBytes = await handlePdfPage({ pdfDoc, pageIndex: idx })
    pageBinaries.push(pdfBytes)
  }

  return pageBinaries
}
