import { PDFDocument } from 'pdf-lib'
import { FILES_DOCTYPE } from 'src/constants'
import { filterWithRemaining } from 'src/helpers/filterWithRemaining'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'

import {
  splitFilename,
  uploadFileWithConflictStrategy
} from 'cozy-client/dist/models/file'
import type CozyClient from 'cozy-client/types/CozyClient'
import type { IOCozyFile } from 'cozy-client/types/types'
import minilog from 'cozy-minilog'

const log = minilog('ForwardBottomSheet')

interface ShareAsAttachmentArgs {
  client: CozyClient
  filesWithPage: { file: IOCozyFile; page: string }[]
  shareFiles: (fileIds: string[]) => Promise<void>
  showAlert: ({
    message,
    severity,
    variant
  }: {
    message: string
    severity: string
    variant: string
  }) => void
  t: (key: string, options?: Record<string, unknown>) => string
  navigate: (path: string, options: Record<string, unknown>) => void
  onClose: () => void
  isMultiSelectionActive: boolean
}

/**
 * Share files as attachment
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {import('../../types').FileWithPage[]} params.filesWithPage - List of files with their page to keep
 * @param {Function} params.shareFiles - Function to share files
 * @param {Function} params.showAlert - Function to show an alert
 * @param {Function} params.t - Translate function
 * @param {Function} params.navigate - Function to navigate
 * @param {Function} params.onClose - Function to close the bottom sheet
 * @param {boolean} params.isMultiSelectionActive - Whether the multi selection is active
 * @returns {Promise<void>}
 */
export const shareAsAttachment = async ({
  client,
  filesWithPage,
  shareFiles,
  showAlert,
  t,
  navigate,
  onClose,
  isMultiSelectionActive
}: ShareAsAttachmentArgs): Promise<void> => {
  const {
    itemsFound: filesWithSpecificPage,
    remainingItems: filesWithoutSpecificPage
  } = filterWithRemaining(filesWithPage, ({ page }) => !!page)
  const fileIds = filesWithoutSpecificPage.map(({ file }) => file._id)
  const fileIdsToRemove = []

  try {
    if (filesWithSpecificPage.length > 0) {
      const newFiles = await createPdfFileByPage({
        client,
        t,
        filesWithSpecificPage
      })
      const tempFileIds = newFiles.map(file => file._id)
      fileIds.push(...tempFileIds)
      fileIdsToRemove.push(...tempFileIds)
    }

    await shareFiles(fileIds)

    removeFilesPermanently(client, fileIdsToRemove).catch((error: Error) => {
      log.error(`Error while removing files: ${error.message}`)
    })

    showAlert({
      message: t('ShareBottomSheet.attachmentResponse.success', {
        smart_count: fileIds.length
      }),
      severity: 'success',
      variant: 'filled'
    })

    if (isMultiSelectionActive) {
      navigate('/paper', { replace: true })
    } else {
      navigate('..', { replace: true })
    }
  } catch (error) {
    if (fileIdsToRemove.length > 0) {
      removeFilesPermanently(client, fileIdsToRemove).catch((error: Error) => {
        log.error(`Error while removing files in catch: ${error.message}`)
      })
    }

    const typedError = error as Error
    // On Android, due to a bug in the library we use, the flagship app always throws "User did not share" error
    // even if user did share. So in this case we prefer to close the bottom sheet without showing an error.
    if (typedError.message === 'User did not share') {
      onClose()
    } else {
      showAlert({
        message: t('ShareBottomSheet.attachmentResponse.error'),
        severity: 'error',
        variant: 'filled'
      })
      onClose()
    }
  }
}

interface CreatePdfFileByPageArgs {
  client: CozyClient
  t: (key: string) => string
  filesWithSpecificPage: { file: IOCozyFile; page: string }[]
}

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
}: CreatePdfFileByPageArgs): Promise<IOCozyFile[]> => {
  return Promise.all(
    filesWithSpecificPage.map(async ({ file, page }) => {
      const pageIndex = page === 'front' ? 0 : 1
      const fileColl = client.collection(FILES_DOCTYPE) as {
        fetchFileContentById: (id: string) => Promise<Response>
      }
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
      const result = await uploadFileWithConflictStrategy(client, pdfBytes, {
        name,
        contentType: 'application/pdf',
        dirId: appFolderID,
        conflictStrategy: 'rename'
      })
      return result.data as IOCozyFile
    })
  )
}

/**
 * @param {import('cozy-client/types/CozyClient').default} client - CozyClient instance
 * @param {string[]} tempFileIds - List of temporary file IDs
 */
export const removeFilesPermanently = async (
  client: CozyClient,
  tempFileIds: string[]
): Promise<void> => {
  for (const tempFileId of tempFileIds) {
    const fileColl = client.collection(FILES_DOCTYPE) as {
      deleteFilePermanently: (id: string) => Promise<void>
    }
    await fileColl.deleteFilePermanently(tempFileId)
  }
}
