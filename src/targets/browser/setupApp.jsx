import { CaptureConsole } from '@sentry/integrations'
import * as Sentry from '@sentry/react'
import memoize from 'lodash/memoize'
import { getValues } from 'src/helpers/bar'
import { getClient } from 'src/helpers/client'

import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'
import { initTranslation } from 'cozy-ui/transpiled/react/providers/I18n'

import manifest from '../../../manifest.webapp'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const root = document.querySelector('[role=application]')
  const { lang } = getValues(JSON.parse(root.dataset.cozy))
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()
  client.registerPlugin(RealtimePlugin)
  client.registerPlugin(flag.plugin)

  Sentry.init({
    dsn: 'https://1b0c26c4c1474da4b7fb5fa9d1e57869@errors.cozycloud.cc/63',
    environment: process.env.NODE_ENV,
    release: manifest.version,
    integrations: [
      new CaptureConsole({ levels: ['error'] }), // We also want to capture the `console.error` to, among other things, report the logs present in the `try/catch`
      new Sentry.BrowserTracing()
    ],
    tracesSampleRate: 1,
    // React log these warnings(bad Proptypes), in a console.error, it is not relevant to report this type of information to Sentry
    ignoreErrors: [/^Warning: /]
  })

  return { root, client, lang, polyglot }
})

export default setupApp
