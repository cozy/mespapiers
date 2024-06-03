import fetch from 'node-fetch'
import { EXPIRATION_SERVICE_NAME, FILES_DOCTYPE } from 'src/constants'
import schema from 'src/doctypes'
import { fetchAllfilesToNotify } from 'src/helpers/service'
import { buildNotification } from 'src/notifications/helpers'

import CozyClient from 'cozy-client'
import logger from 'cozy-logger'
import { sendNotification } from 'cozy-notifications'

global.fetch = fetch
const logService = logger.namespace('service/expiration')

const expiration = async () => {
  logService('info', `Start ${EXPIRATION_SERVICE_NAME} service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const filesInfo = await fetchAllfilesToNotify(client)
  logService('info', `Found ${filesInfo.length} file(s)`)

  if (filesInfo.length > 0) {
    const notification = buildNotification(client, { filesInfo })
    logService('info', `Send notification...`)
    await sendNotification(client, notification)

    logService('info', `Update file(s) notified to stop being notified`)
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
  logService('error', error)
  process.exit(1)
})
