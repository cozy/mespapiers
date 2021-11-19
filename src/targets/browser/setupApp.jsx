import memoize from 'lodash/memoize'

import { initTranslation } from 'cozy-ui/transpiled/react/I18n'

import { getClient } from 'src/helpers/client'
import { getValues, initBar } from 'src/helpers/bar'
import { RealtimePlugin } from 'cozy-realtime'
import flag from 'cozy-flags'

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

  if (process.env.NODE_ENV !== 'production' && flag('switcher') === null) {
    flag('switcher', true)
  }

  initBar({ client, root, lang, appName })

  return { root, client, lang, polyglot }
})

export default setupApp
