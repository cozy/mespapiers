import schema from 'src/doctypes'

import CozyClient, { FlagshipLink } from 'cozy-client'
import { isFlagshipApp, isFlagshipOfflineSupported } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { Intents } from 'cozy-interapp'
import { RealtimePlugin } from 'cozy-realtime'

import manifest from '../../../manifest.webapp'

/**
 * Make and returns cozy client instance
 * @returns {import('cozy-client/types/CozyClient').default} cozy client instance
 */
export const makeClient = intent => {
  const root = document.querySelector('[role=application]')
  const data = JSON.parse(root.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  const shouldUseFlagshipLink = isFlagshipApp() && isFlagshipOfflineSupported()

  const client = new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: true,
    links: shouldUseFlagshipLink
      ? new FlagshipLink({ webviewIntent: intent })
      : null
  })

  const intents = new Intents({ client })
  client.intents = intents

  client.registerPlugin(RealtimePlugin)
  client.registerPlugin(flag.plugin)

  return client
}
