import { PDFDocument } from 'pdf-lib'
import {
  FILES_DOCTYPE,
  TWO_SIDED_FILE_QUALIFICATION_LABELS
} from 'src/constants'

import { getQualification } from 'cozy-client/dist/models/document'
import minilog from 'cozy-minilog'

const log = minilog('helpers/is2SidedFile')

/**
 * Check if a file is two-sided by checking the qualification, the mime type and the number of pages
 * @param {import('cozy-client/types/CozyClient').default} client - Cozy client
 * @param {import('cozy-client/types/types').IOCozyFile} file - IOCozyFile to check
 * @returns {Promise<boolean>} - True if the file is two-sided
 */
export const is2SidedFile = async (client, file) => {
  try {
    const qualificationLabel = getQualification(file)?.label

    if (
      !qualificationLabel ||
      !TWO_SIDED_FILE_QUALIFICATION_LABELS.includes(qualificationLabel) ||
      file.mime !== 'application/pdf'
    ) {
      return false
    }

    const fileColl = client.collection(FILES_DOCTYPE)
    const fileBin = await fileColl.fetchFileContentById(file._id)
    const arrayBuffer = await fileBin.arrayBuffer()
    const document = await PDFDocument.load(arrayBuffer)

    return document.getPageCount() === 2
  } catch (error) {
    log.error(`Error while checking if file is two-sided : ${error}`)
    return false
  }
}
