import memoize from 'lodash/memoize'
import * as Sentry from '@sentry/react'

import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import { getClient } from 'src/helpers/client'
import { getValues, initBar } from 'src/helpers/bar'
import { RealtimePlugin } from 'cozy-realtime'
import flag from 'cozy-flags'

import manifest from '../../../manifest.webapp'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const root = document.querySelector('[role=application]')
  const { lang, appName } = getValues(JSON.parse(root.dataset.cozy))
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  client.registerPlugin(RealtimePlugin)
  client.registerPlugin(flag.plugin)

  Sentry.init({
    dsn: 'https://1b0c26c4c1474da4b7fb5fa9d1e57869@errors.cozycloud.cc/63',
    environment: process.env.NODE_ENV,
    release: manifest.version,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1
  })

  initBar({ client, root, lang, appName })

  return { root, client, lang, polyglot }
})

export default setupApp
