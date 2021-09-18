import { models } from 'cozy-client'

import { APPS_DOCTYPE } from 'src/doctypes'
import { getClient } from 'src/utils/client'

const { MAGIC_FOLDERS, ensureMagicFolder, getReferencedFolder } = models.folder

const APP_DIR_NAME = 'Papers'
const APP_DIR_REF = `${APPS_DOCTYPE}/papers`

const getOrCreateAppFolderWithReference = async () => {
  const client = getClient()
  const existingFolders = await getReferencedFolder(client, {
    _id: APP_DIR_REF,
    _type: APPS_DOCTYPE
  })

  if (existingFolders) {
    return existingFolders
  } else {
    const { path: administrativeFolderPath } = await ensureMagicFolder(
      client,
      MAGIC_FOLDERS.ADMINISTRATIVE
    )
    const appFolder = await ensureMagicFolder(
      client,
      APP_DIR_NAME,
      `${administrativeFolderPath}/${APP_DIR_NAME}`
    )

    return appFolder
  }
}

export default getOrCreateAppFolderWithReference
