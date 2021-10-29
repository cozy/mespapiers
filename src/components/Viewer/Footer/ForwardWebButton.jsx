import React from 'react'
import PropTypes from 'prop-types'

import { useClient, generateWebLink, useCapabilities } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import ReplyIcon from 'cozy-ui/transpiled/react/Icons/Reply'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import fr from '../locales/fr.json'
import en from '../locales/fr.json'

const locales = { fr, en }

export const getSharingLink = async (client, file, isFlatDomain) => {
  const PERMS = {
    _type: 'io.cozy.permissions',
    permissions: {
      files: { type: 'io.cozy.files', values: [file.id], verbs: ['GET'] }
    }
  }
  const { data: sharedLink } = await client.save(PERMS)

  const webLink = generateWebLink({
    cozyUrl: client.getStackClient().uri,
    searchParams: [['sharecode', sharedLink?.attributes?.shortcodes?.code]],
    pathname: '/public',
    slug: 'drive',
    subDomainType: isFlatDomain ? 'flat' : 'nested'
  })

  return webLink
}

const ForwardWebButton = ({ file }) => {
  const { t } = useI18n()
  const client = useClient()
  const { capabilities } = useCapabilities(client)
  const isFlatDomain = capabilities?.data?.attributes?.flat_subdomains

  const onFileOpen = async file => {
    try {
      const url = await getSharingLink(client, file, isFlatDomain)
      const shareData = {
        title: t('viewer.shareData.title', { name: file.name }),
        text: t('viewer.shareData.text', { name: file.name }),
        url
      }
      navigator.share(shareData)
    } catch (error) {
      Alerter.error('viewer.shareData.error', { error: error })
    }
  }

  return (
    <Button
      extension="full"
      theme="secondary"
      icon={ReplyIcon}
      label={t('viewer.actions.forward')}
      onClick={() => onFileOpen(file)}
    />
  )
}

ForwardWebButton.propTypes = {
  file: PropTypes.object.isRequired
}

export default withLocales(locales)(ForwardWebButton)
