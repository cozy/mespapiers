import { FILES_DOCTYPE } from 'src/constants'

export const fetchContentFileToJson = async (client, file) => {
  try {
    const fileColl = client.collection(FILES_DOCTYPE)
    const fileBin = await fileColl.fetchFileContentById(file._id)
    const fileJSON = await fileBin.json()

    return fileJSON
  } catch (error) {
    return null
  }
}
