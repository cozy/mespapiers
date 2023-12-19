import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import minilog from 'cozy-minilog'

import { sendNotification } from 'cozy-notifications'

import schema from 'src/doctypes'
import { fetchAllfilesToNotify } from 'src/helpers/service'
import { EXPIRATION_SERVICE_NAME, FILES_DOCTYPE } from 'src/constants'
import { buildNotification } from 'src/notifications/helpers'

global.fetch = fetch
const log = minilog('service/expiration')

const expiration = async () => {
  log.info(`Start ${EXPIRATION_SERVICE_NAME} service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const filesInfo = await fetchAllfilesToNotify(client)
  log.info(`Found ${filesInfo.length} file(s)`)

  if (filesInfo.length > 0) {
    const notification = buildNotification(client, { filesInfo })
    log.info(`Send notification...`)
    await sendNotification(client, notification)

    log.info(`Update file(s) notified to stop being notified`)
    for (const fileInfo of filesInfo) {
      const { file } = fileInfo
      await client.collection(FILES_DOCTYPE).updateMetadataAttribute(file._id, {
        ...file.metadata,
        notifiedAt: new Date().toISOString()
      })
    }
  }
}

expiration().catch(error => {
  log.error(error)
  process.exit(1)
})
