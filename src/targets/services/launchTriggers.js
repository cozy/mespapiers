import fetch from 'node-fetch'

import CozyClient from 'cozy-client'
import log from 'cozy-logger'

import { EXPIRATION_SERVICE_NAME, TRIGGERS_DOCTYPE } from 'src/constants'
import { fetchOrCreateTriggerByName } from 'src/helpers/service'
import schema from 'src/doctypes'

global.fetch = fetch

const triggersName = [EXPIRATION_SERVICE_NAME]

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} serviceName - Name of service
 * @returns
 */
const fetchAndLaunchTrigger = async (client, serviceName) => {
  const { data: normalizedTrigger } = await fetchOrCreateTriggerByName(
    client,
    serviceName
  )

  log('info', `Launch trigger with ${serviceName} service name`)
  await client.collection(TRIGGERS_DOCTYPE).launch(normalizedTrigger)

  return serviceName
}

/**
 * Launch manually (& create if necessary) triggers
 * For development usage, see documentation for more details
 */
const launchTriggers = async () => {
  try {
    log('info', `Start launchTriggers`)

    const client = CozyClient.fromEnv(process.env, { schema })

    const result = await Promise.allSettled(
      triggersName.map(triggerName =>
        fetchAndLaunchTrigger(client, triggerName)
      )
    )
    for (const res of result) {
      const { status, value, reason } = res

      if (status === 'rejected') {
        log('critical', reason)
      }
      if (status === 'fulfilled') {
        log('info', `Launch trigger ${value} success`)
      }
    }
  } catch (error) {
    log('critical', error)
    process.exit(1)
  }
}

launchTriggers()
