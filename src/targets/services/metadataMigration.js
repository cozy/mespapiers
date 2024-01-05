import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import logger from 'cozy-logger'

import schema from 'src/doctypes'
import {
  extractFilesToMigrate,
  fetchAppSetting,
  fetchFilesFromDateWithMetadata,
  getMostRecentUpdatedDate,
  migrateFileMetadata,
  specificMigration,
  updateAppSettings,
  getFilesWithMetadata
} from 'src/helpers/migration/metadata'

global.fetch = fetch
const logService = logger.namespace('service/metadataMigration')

const BATCH_FILES_LIMIT = 1000 // to avoid processing too many files and get timeouts

/**
 * Get current Date to ISO string
 */
const getCurrentDate = () => {
  return new Date().toISOString()
}

/**
 * This service migrate files metadata.
 * It queries files starting from the date saved in the settings
 * and evaluate for each file if some old metadata attributes exist
 * to migrate to the new metadata name.
 * Note we restrict the max file processing to BATCH_FILES_LIMIT to avoid
 * service time-out.
 */
export const migrateMetadata = async () => {
  logService('info', 'Start metadata migration service')
  const client = CozyClient.fromEnv(process.env, { schema })

  const filesSettings = await fetchAppSetting(client)
  const appSettings = filesSettings?.data?.[0]
  let lastProcessedFileDate = null
  let lastRunningMigrateMetadataService = null

  if (appSettings?.lastProcessedFileDate != null) {
    logService('info', 'appSettings.lastProcessedFileDate found')
    lastProcessedFileDate = appSettings.lastProcessedFileDate
  }
  if (appSettings?.lastRunningMigrateMetadataService != null) {
    logService('info', 'appSettings.lastRunningMigrateMetadataService found')
    lastRunningMigrateMetadataService =
      appSettings.lastRunningMigrateMetadataService
  }

  const filesByDateWithMetadata = await fetchFilesFromDateWithMetadata({
    client,
    date: lastProcessedFileDate,
    limit: BATCH_FILES_LIMIT
  })

  // TODO https://github.com/cozy/mespapiers/issues/395,
  const filesWithMetadata = getFilesWithMetadata(filesByDateWithMetadata)

  if (filesWithMetadata.length === 0) {
    logService('info', 'No new file with metadata found')
    logService(
      'info',
      `Save last running service date: ${lastRunningMigrateMetadataService}`
    )
    await updateAppSettings({
      client,
      appSettings,
      lastRunningMigrateMetadataService: getCurrentDate()
    })
    return
  }
  logService('info', `Found ${filesWithMetadata.length} files to process`)

  lastProcessedFileDate =
    filesWithMetadata[filesWithMetadata.length - 1].cozyMetadata.updatedAt

  // TODO To refactored later to make migrateMetadata more dynamic, if necessary to add new migrations
  await specificMigration(client, filesWithMetadata)

  const filesToMigrate = extractFilesToMigrate(filesWithMetadata)
  logService('info', `Found ${filesToMigrate.length} files to migrate`)

  if (filesToMigrate.length === 0) {
    logService('info', 'No file found to migrate')
  } else {
    const migratedFiles = await migrateFileMetadata(client, filesToMigrate)
    if (migratedFiles.length < filesToMigrate.length) {
      logService(
        'warn',
        `${
          filesToMigrate.length - migratedFiles.length
        } files could not be migrated`
      )
    } else {
      lastProcessedFileDate = getMostRecentUpdatedDate(migratedFiles)
    }
    logService('info', `Migrated ${migratedFiles.length} files`)
  }

  logService('info', `Save last processed file date: ${lastProcessedFileDate}`)
  await updateAppSettings({
    client,
    appSettings,
    lastProcessedFileDate,
    lastRunningMigrateMetadataService: getCurrentDate()
  })
}

migrateMetadata().catch(e => {
  logService('error', e)
  process.exit(1)
})
