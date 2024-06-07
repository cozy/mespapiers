import schema from 'src/doctypes'

import CozyClient from 'cozy-client'
import { Intents } from 'cozy-interapp'

import manifest from '../../../manifest.webapp'

/**
 * Make and returns cozy client instance
 * @returns {import('cozy-client/types/CozyClient').default} cozy client instance
 */
export const makeClient = () => {
  const root = document.querySelector('[role=application]')
  const data = JSON.parse(root.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  const client = new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: true
  })

  const intents = new Intents({ client })
  client.intents = intents

  return client
}
