import { PDFDocument } from 'pdf-lib'
import { FILES_DOCTYPE } from 'src/constants'

/**
 * Get the expected page of a PDF file
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - CozyClient instance
 * @param {import('cozy-client/types/types').IOCozyFile} param.file - io.cozy.file
 * @param {number} param.pageIndex - Index of page to get
 * @returns {Promise<Uint8Array>} - Binary of the new PDF file
 */
export const getPdfPage = async ({ client, file, pageIndex }) => {
  const fileColl = client.collection(FILES_DOCTYPE)
  const fileBin = await fileColl.fetchFileContentById(file._id)
  const arrayBuffer = await fileBin.arrayBuffer()
  const newPdfDoc = await PDFDocument.create()
  const pdfDocLoaded = await PDFDocument.load(arrayBuffer)
  const [copiedPage] = await newPdfDoc.copyPages(pdfDocLoaded, [pageIndex])
  newPdfDoc.addPage(copiedPage)

  return newPdfDoc.save()
}
