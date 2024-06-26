import { PDFDocument } from 'pdf-lib'
import React from 'react'
import { FILES_DOCTYPE } from 'src/constants'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'
import { makeFileLinksURL } from 'src/helpers/makeFileLinksURL'

import {
  uploadFileWithConflictStrategy,
  splitFilename,
  isNote
} from 'cozy-client/dist/models/file'
import Icon from 'cozy-ui/transpiled/react/Icon'

/**
 * Create a new PDF file with a specific page from another PDF file
 *
 * @todo should be replaced by a better approach (flagship or stack)
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {Function} params.t - Translate function
 * @param {import('../../types').FileWithPage[]} params.filesWithSpecificPage - List of files with their page to keep
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

export const renderImage = ({ client, file, hasPage, isMultipleFile }) => {
  if (isMultipleFile) {
    return <Icon icon="file-type-zip" size={64} />
  }
  if (hasPage) {
    return <Icon icon="file-type-pdf" size={64} />
  }
  if (isNote(file)) {
    return <Icon icon="file-type-note" size={64} />
  }

  const src = makeFileLinksURL({
    client,
    file,
    linkType: 'tiny'
  })

  return src ? (
    <img src={src} alt="" className="u-mah-3 u-maw-3" />
  ) : (
    <Icon icon="file-type-files" size={64} />
  )
}
