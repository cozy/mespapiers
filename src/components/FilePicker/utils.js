import { Q } from 'cozy-client'

const FILES_DOCTYPE = 'io.cozy.files'

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} fileId - Id of file
 * @returns {Promise<QueryDefinition>}
 */
export const getFileById = async (client, fileId) => {
  const response = await client.query(Q(FILES_DOCTYPE).getById(fileId))

  return response
}

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {IOCozyFile} file - IOCozyFile
 * @returns {Promise<Blob>}
 */
export const getFileBlob = async (client, file) => {
  const fileColl = client.collection(FILES_DOCTYPE)
  const fileDataBin = await fileColl.fetchFileContentById(file._id)

  if (fileDataBin.status === 404) {
    throw { title: `${file.name} not found`, status: fileDataBin.status }
  }

  const fileBlob = await fileDataBin.blob()

  return fileBlob
}
