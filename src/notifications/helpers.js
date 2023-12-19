import minilog from 'cozy-minilog'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n/translation'

import { dictRequire, lang } from 'src/constants'
import ExpirationNotification from 'src/notifications'

const log = minilog('buildNotification')
const translation = initTranslation(lang, dictRequire)
const t = translation.t.bind(translation)

/**
 * Build the notification for expiration serivce
 *
 * @param  {CozyClient} client - Cozy client
 * @param  {object} options - Options
 * @return {NotificationView} - The konnector alerts notification view
 */
export const buildNotification = (client, options) => {
  log.info('Build notification...')
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
