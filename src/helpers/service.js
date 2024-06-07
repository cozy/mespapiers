import { APP_SLUG, TRIGGERS_DOCTYPE } from 'src/constants'
import {
  buildAllFilesToNotifyQuery,
  buildTriggerByIdQuery,
  buildTriggerByServiceNameQuery
} from 'src/queries'

import { models } from 'cozy-client'
import logService from 'cozy-logger'

const { computeExpirationDate, isExpired, isExpiringSoon } = models.paper

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} serviceName - Name of the service
 * @returns {Promise<Object>} Normalized trigger
 */
export const createTriggerByName = async (client, serviceName) => {
  logService(
    'info',
    `Create trigger with "${serviceName}" service name`,
    undefined,
    'service/launchTriggers'
  )
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
  logService(
    'info',
    `Fetch trigger with "${serviceName}" service name`,
    undefined,
    'service/launchTriggers'
  )

  const triggerByServiceNameQuery = buildTriggerByServiceNameQuery(serviceName)
  const { data: triggers } = await client.query(
    triggerByServiceNameQuery.definition
  )

  if (!triggers || triggers.length === 0) {
    logService('error', serviceName, undefined, 'service/launchTriggers')
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
  logService(
    'info',
    'Fetch all files to notify',
    undefined,
    'service/expiration'
  )

  const filesToNotifyQuery = buildAllFilesToNotifyQuery()
  const files = await client.queryAll(filesToNotifyQuery.definition)

  return getfilesNeedNotified(files)
}
