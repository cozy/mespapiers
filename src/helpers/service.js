import log from 'cozy-logger'

import { models } from 'cozy-client'

import { APP_SLUG, TRIGGERS_DOCTYPE } from 'src/constants'
import {
  buildAllFilesToNotifyQuery,
  buildTriggerByIdQuery,
  buildTriggerByServiceNameQuery
} from 'src/helpers/queries'

const { computeExpirationDate, isExpired, isExpiringSoon } = models.paper

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} serviceName - Name of the service
 * @returns {Promise<Object>} Normalized trigger
 */
export const createTriggerByName = async (client, serviceName) => {
  log('info', `Create trigger with "${serviceName}" service name`)
  if (!serviceName) {
    throw new Error('Invalid service name')
  }

  const attrs = {
    _type: TRIGGERS_DOCTYPE,
    type: '@daily',
    arguments: 'between 1pm and 3pm',
    worker: 'service',
    message: {
      name: serviceName,
      slug: APP_SLUG
    }
  }

  return client.save(attrs)
}

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} serviceName - Name of the service
 * @returns {Promise<Object>} Normalized trigger
 */
export const fetchOrCreateTriggerByName = async (client, serviceName) => {
  log('info', `Fetch trigger with "${serviceName}" service name`)

  const triggerByServiceNameQuery = buildTriggerByServiceNameQuery(serviceName)
  const { data: triggers } = await client.query(
    triggerByServiceNameQuery.definition
  )

  if (!triggers || triggers.length === 0) {
    log('error', `Can't find trigger with "${serviceName}" service name`)
    return createTriggerByName(client, serviceName)
  }

  const triggerByIdQuery = buildTriggerByIdQuery(triggers[0].id)
  return client.query(triggerByIdQuery.definition)
}

/**
 * @param {IOCozyFile[]} files - List of CozyFile
 * @returns {{ file: IOCozyFile, expirationDate: string }[]} List of CozyFile that must be notified with their noticeDate & expirationDate
 */
export const getfilesNeedNotified = files => {
  return files
    .filter(file => {
      return isExpired(file) || isExpiringSoon(file)
    })
    .map(file => {
      const expirationDate = computeExpirationDate(file).toISOString()
      return {
        file,
        expirationDate
      }
    })
}

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @returns {Promise<IOCozyFile[]>} List of CozyFile that must be notified
 */
export const fetchAllfilesToNotify = async client => {
  log('info', `Fetch all files to notify`)

  const filesToNotifyQuery = buildAllFilesToNotifyQuery()
  const files = await client.queryAll(filesToNotifyQuery.definition)

  return getfilesNeedNotified(files)
}
