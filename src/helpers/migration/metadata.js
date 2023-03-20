import log from 'cozy-logger'

import { APP_SETTINGS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'
import {
  buildAppSettingQuery,
  buildFilesFromDateQuery
} from 'src/helpers/migration/queries'

const OLD_METADATA_ATTRIBUTES = [
  'cafFileNumber',
  'cardNumber',
  'vinNumber',
  'ibanNumber',
  'passportNumber'
]
const NEW_METADATA_ATTRIBUTE = 'number'

/**
 * Fetch the io.cozy.mespapiers.settings document
 *
 * @param {object} client - The CozyClient instance
 */
export const fetchAppSetting = async client => {
  log('info', 'Start fetchAppSetting')
  const appSettingQuery = buildAppSettingQuery()

  return client.query(appSettingQuery.definition)
}

/**
 * Fetch the files indexed on their updatedAt date and
 * the existence of the "metadata" property
 *
 * @param {object} client - The CozyClient instance
 * @param {string} date - The starting date to query
 * @param {number} limit - The maximum number of files by request
 */
export const fetchFilesFromDateWithMetadata = async ({
  client,
  date,
  limit
}) => {
  log('info', 'Start fetchFilesFromDate')
  const filesFromDateQuery = buildFilesFromDateQuery(date, limit)

  return client.queryAll(filesFromDateQuery.definition)
}

/**
 * Update IOCozyMespapiersSettings with the last process date
 *
 * @param {object} client - The CozyClient instance
 * @param {object} appSettings - The io.cozy.mespapiers.settings document
 * @param {string} lastProcessedFileDate - The last processed file date
 */
export const updateAppSettings = async ({
  client,
  appSettings,
  lastProcessedFileDate,
  lastRunningMigrateMetadataService
}) => {
  const attrs = {
    ...(appSettings ? { ...appSettings } : { _type: APP_SETTINGS_DOCTYPE }),
    lastProcessedFileDate:
      lastProcessedFileDate || appSettings.lastProcessedFileDate,
    lastRunningMigrateMetadataService:
      lastRunningMigrateMetadataService ||
      appSettings.lastRunningMigrateMetadataService
  }

  return client.save(attrs)
}

/**
 * From a list of files, find the most recent updatedAt value
 *
 * @param {Array} files - The IOCozyFiles array
 */
export const getMostRecentUpdatedDate = files => {
  const sortedFiles = files.sort(
    (a, b) =>
      new Date(a.attributes.cozyMetadata.updatedAt).getTime() -
      new Date(b.attributes.cozyMetadata.updatedAt).getTime()
  )

  return sortedFiles.length > 0
    ? sortedFiles[sortedFiles.length - 1].attributes.cozyMetadata.updatedAt
    : null
}

/**
 * Make new metadata with tne new property
 *
 * @param {object} oldMetadata - The metadata of IOCozyFile
 */
export const makeNewMetadata = oldMetadata => {
  const newMetadata = {}
  for (const oldMetadataKey of Object.keys(oldMetadata)) {
    // If a property needs to be replaced and the new property is not already present in the metadata
    if (
      OLD_METADATA_ATTRIBUTES.includes(oldMetadataKey) &&
      // eslint-disable-next-line no-prototype-builtins
      !newMetadata.hasOwnProperty(NEW_METADATA_ATTRIBUTE)
    ) {
      Object.assign(newMetadata, {
        [NEW_METADATA_ATTRIBUTE]: oldMetadata[oldMetadataKey]
      })
      continue
    }

    Object.assign(newMetadata, {
      [oldMetadataKey]: oldMetadata[oldMetadataKey]
    })
  }

  return newMetadata
}

/**
 * Migrate files by replace old metadata by new metadata if it doesn't already exist
 *
 * @param {object} client - The CozyClient instance
 * @param {Array} files - The files to migrate
 * @returns {Promise<Array>} The saved files
 */
export const migrateFileMetadata = async (client, files) => {
  const filesWithMetadataMigrated = []

  for (const file of files) {
    const { metadata } = file
    const metadataKeys = Object.keys(metadata)

    if (metadataKeys.includes(NEW_METADATA_ATTRIBUTE)) {
      filesWithMetadataMigrated.push(file)
    } else {
      const newMetadata = makeNewMetadata(metadata)

      const fileCollection = client.collection(FILES_DOCTYPE)
      const { data: fileUpdated } =
        await fileCollection.updateMetadataAttribute(file._id, newMetadata)
      filesWithMetadataMigrated.push(fileUpdated)
    }
  }

  return filesWithMetadataMigrated
}

/**
 * Keep only the files with old metadata
 *
 * @param {Array} files - The IOCozyFiles array
 */
export const extractFilesToMigrate = files => {
  log('info', 'Start extractFilesToMigrate')
  return files.filter(file => {
    const { metadata } = file

    const hasOldAttribute = Object.keys(metadata).find(attrName =>
      OLD_METADATA_ATTRIBUTES.includes(attrName)
    )
    if (!hasOldAttribute) return false

    return true
  })
}
