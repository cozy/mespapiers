import logger from 'cozy-logger'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n/translation'

import { dictRequire, lang } from 'src/constants'
import ExpirationNotification from 'src/notifications'

const logService = logger.namespace('buildNotification')
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

/**
 * Build the notification for expiration serivce
 *
 * @param  {CozyClient} client - Cozy client
 * @param  {object} options - Options
 * @return {ExpirationNotification} - The konnector alerts notification view
 */
export const buildNotification = (client, options) => {
  logService('info', 'Build notification...')
  const notification = new ExpirationNotification({
    client,
    lang,
    t,
    data: {},
    locales: {
      [lang]: dictRequire(lang)
    },
    ...options
  })
  return notification
}
