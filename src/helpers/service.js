import sub from 'date-fns/sub'
import add from 'date-fns/add'

import log from 'cozy-logger'
import papersDefinitions from 'cozy-mespapiers-lib/dist/constants/papersDefinitions.json'

import {
  APP_SLUG,
  DEFAULT_NOTICE_PERIOD_DAYS,
  PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS,
  TRIGGERS_DOCTYPE
} from 'src/constants'
import {
  buildAllFilesToNotifyQuery,
  buildTriggerByIdQuery,
  buildTriggerByServiceNameQuery
} from 'src/helpers/queries'

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
 * @param {IOCozyFile} file - An CozyFile
 * @param {string} dateLabel - Label of date
 * @returns {string} Normalize expiration date (ISO)
 */
export const computeNormalizeExpirationDate = (file, dateLabel) => {
  if (file.metadata[dateLabel]) {
    if (dateLabel === 'referencedDate') {
      return add(new Date(file.metadata[dateLabel] ?? file.created_at), {
        days: 365
      }).toISOString()
    }
    return new Date(file.metadata[dateLabel]).toISOString()
  }

  return null
}

/**
 * @param {IOCozyFile} file - An CozyFile
 * @param {string} dateLabel - Label of date
 * @returns {string} Notice date (ISO)
 */
export const computeNoticeDate = (file, dateLabel) => {
  let noticeDays
  if (file.metadata[dateLabel]) {
    if (dateLabel === 'referencedDate') {
      noticeDays = PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS
    }
    if (dateLabel === 'expirationDate') {
      noticeDays =
        parseInt(file.metadata.noticePeriod, 10) || DEFAULT_NOTICE_PERIOD_DAYS
    }
  }
  if (!noticeDays) {
    return null
  }

  const normalizeExpirationDate = computeNormalizeExpirationDate(
    file,
    dateLabel
  )

  return normalizeExpirationDate
    ? sub(new Date(normalizeExpirationDate), {
        days: noticeDays
      }).toISOString()
    : null
}

/**
 * @param {IOCozyFile} file - An CozyFile
 * @returns {{ label: string, country?: string, expirationDateAttribute: string }[]} papersToNotify - Rule in the paperDefinitions file
 */
const getPaperToNotify = file => {
  const { papersToNotify } = papersDefinitions.notifications

  return papersToNotify.find(({ label, expirationDateAttribute, country }) => {
    let validCountry = true
    if (country && country !== 'fr') {
      validCountry = file.metadata.country === country
    }

    return (
      validCountry &&
      label === file.metadata.qualification.label &&
      file.metadata[expirationDateAttribute]
    )
  })
}

/**
 * @param {IOCozyFile[]} files - List of CozyFile
 * @returns {{ file: IOCozyFile, noticeDate: string, expirationDate: string }[]} List of CozyFile that must be notified with their noticeDate & expirationDate
 */
export const getfilesNeedNotified = files => {
  return files
    .map(file => {
      const paperToNotify = getPaperToNotify(file)

      if (paperToNotify) {
        const noticeDate = computeNoticeDate(
          file,
          paperToNotify.expirationDateAttribute
        )

        if (!noticeDate) {
          return null
        }

        return new Date() >= new Date(noticeDate)
          ? {
              file,
              noticeDate,
              expirationDate: computeNormalizeExpirationDate(
                file,
                paperToNotify.expirationDateAttribute
              )
            }
          : null
      }

      return null
    })
    .filter(Boolean)
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
