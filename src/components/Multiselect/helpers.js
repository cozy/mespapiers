import { PDFDocument } from 'pdf-lib'
import { FILES_DOCTYPE } from 'src/constants'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'

import {
  uploadFileWithConflictStrategy,
  splitFilename
} from 'cozy-client/dist/models/file'

/**
 * Create a new PDF file with a specific page from another PDF file
 *
 * @todo should be replaced by a better approach (flagship or stack)
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {Function} params.t - Translate function
 * @param {{file: import('cozy-client/types/types').IOCozyFile, page: string|null}[]} params.filesWithSpecificPage - List of files with their page to keep
 * @returns {Promise<import('cozy-client/types/types').IOCozyFile[]>} - List of io.cozy.files
 */
export const createPdfFileByPage = async ({
  client,
  t,
  filesWithSpecificPage
}) => {
  return Promise.all(
    filesWithSpecificPage.map(async ({ file, page }) => {
      const pageIndex = page === 'front' ? 0 : 1
      const fileColl = client.collection(FILES_DOCTYPE)
      const fileBin = await fileColl.fetchFileContentById(file._id)
      const arrayBuffer = await fileBin.arrayBuffer()

      const newPdfDoc = await PDFDocument.create()
      const pdfDocLoaded = await PDFDocument.load(arrayBuffer)
      const [copiedPage] = await newPdfDoc.copyPages(pdfDocLoaded, [pageIndex])
      newPdfDoc.addPage(copiedPage)
      const pdfBytes = await newPdfDoc.save()

      const { filename, extension } = splitFilename(file)
      const name = `${filename}_${t(`Multiselect.page.${page}`)}${extension}`
      const { _id: appFolderID } = await getOrCreateAppFolderWithReference(
        client,
        t
      )
      const { data: tempFileCreated } = await uploadFileWithConflictStrategy(
        client,
        pdfBytes,
        {
          name,
          contentType: 'application/pdf',
          dirId: appFolderID,
          conflictStrategy: 'rename'
        }
      )
      return tempFileCreated
    })
  )
}

/**
 * @param {import('cozy-client/types/CozyClient').default} client - CozyClient instance
 * @param {string[]} tempFileIds - List of temporary file IDs
 */
export const removeFilesPermanently = async (client, tempFileIds) => {
  for (const tempFileId of tempFileIds) {
    await client.collection(FILES_DOCTYPE).deleteFilePermanently(tempFileId)
  }
}
