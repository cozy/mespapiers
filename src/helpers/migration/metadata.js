import isSameDay from 'date-fns/isSameDay'

import log from 'cozy-logger'
import flag from 'cozy-flags'

import {
  APP_SETTINGS_DOCTYPE,
  FILES_DOCTYPE,
  JOBS_DOCTYPE
} from 'src/constants'
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
 * @param {import('cozy-client/types/CozyClient').default} client - The CozyClient instance
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
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - The CozyClient instance
 * @param {string} param.date - The starting date to query
 * @param {number} param.limit - The maximum number of files by request
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
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client
 * @param {import('cozy-client/types/types').CozyClientDocument & { lastProcessedFileDate: string, lastRunningMigrateMetadataService: string }} param.appSettings - The io.cozy.mespapiers.settings document
 * @param {string} param.lastProcessedFileDate
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
 * @param {import('cozy-client/types/types').IOCozyFile[]} files
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
 * @param {import('cozy-client/types/types').FileMetadata} oldMetadata
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
 * @param {import('cozy-client/types/CozyClient').default} client
 * @param {import('cozy-client/types/types').IOCozyFile[]} files
 * @returns {Promise<import('cozy-client/types/types').IOCozyFile[]>} The saved files
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
 * @param {import('cozy-client/types/types').IOCozyFile[]} files
 * @returns {import('cozy-client/types/types').IOCozyFile[]}
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

/**
 * Migrate 'RFR' metadata to 'refTaxIncome'
 *
 * @param {import('cozy-client/types/CozyClient').default} client
 * @param {import('cozy-client/types/types').IOCozyFile[]} files
 * @returns {Promise<import('cozy-client/types/types').IOCozyFile[]>}
 */
export const specificMigration = async (client, files) => {
  const filesWithMetadataMigrated = []

  for (const file of files) {
    const { metadata } = file
    const metadataKeys = Object.keys(metadata)

    if (metadataKeys.includes('RFR')) {
      metadata.refTaxIncome = metadata.RFR
      delete metadata.RFR

      const fileCollection = client.collection(FILES_DOCTYPE)
      const { data: fileUpdated } =
        await fileCollection.updateMetadataAttribute(file._id, metadata)

      filesWithMetadataMigrated.push(fileUpdated)
    } else {
      filesWithMetadataMigrated.push(file)
    }
  }

  return filesWithMetadataMigrated
}

/**
 *
 * @param {import('cozy-client/types/types').IOCozyFile[]} files
 * @returns {import('cozy-client/types/types').IOCozyFile[]}
 */
export const getFilesWithMetadata = files => {
  return files.filter(file => file.metadata)
}

/**
 * Launch metadataMigration job
 * When flag "mespapiers.migrated.metadata" is enabled
 *
 * @param {import('cozy-client/types/CozyClient').default} client
 */
export const launchMetadataMigrationJob = async client => {
  try {
    if (!flag('mespapiers.migrated.metadata')) {
      log('info', 'Flag "mespapiers.migrated.metadata" disabled')
      return
    }

    log('info', 'Start launchMetadataMigrationJob')
    const { data } = await fetchAppSetting(client)
    const settings = data?.[0] || {}

    if (
      settings?.lastRunningMigrateMetadataService &&
      isSameDay(
        new Date(settings.lastRunningMigrateMetadataService),
        new Date()
      )
    ) {
      log(
        'info',
        'Stop launchMetadataMigrationJob because is already launched today'
      )
      return
    }

    log(
      'info',
      `Create job service with slug: 'mespapiers' & name: 'metadataMigration'`
    )
    const jobColl = client.collection(JOBS_DOCTYPE)
    await jobColl.create(
      'service',
      { slug: 'mespapiers', name: 'metadataMigration' },
      {},
      true
    )
  } catch (error) {
    log('error', `launchMetadataMigrationJob error: ${error}`)
  }
}
