import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import log from 'cozy-logger'

import schema from 'src/doctypes'
import { fetchAllfilesToNotify } from 'src/helpers/service'
import { EXPIRATION_SERVICE_NAME } from 'src/constants'

global.fetch = fetch

const expiration = async () => {
  log('info', `Start ${EXPIRATION_SERVICE_NAME} service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const files = await fetchAllfilesToNotify(client)
  log('info', `Found ${files.length} file(s)`)
}

expiration().catch(error => {
  log('critical', error)
  process.exit(1)
})
