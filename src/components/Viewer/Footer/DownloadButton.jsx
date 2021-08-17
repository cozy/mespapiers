import React from 'react'
import PropTypes from 'prop-types'

import { useClient } from 'cozy-client'
import DownloadIcon from 'cozy-ui/transpiled/react/Icons/Download'
import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import fr from '../locales/fr.json'
import en from '../locales/fr.json'

const locales = { fr, en }

const DownloadButton = ({ file, t }) => {
  const client = useClient()

  const handleClick = async file => {
    try {
      await client.collection('io.cozy.files').download(file)
    } catch (error) {
      Alerter.info('viewer.error.generic')
    }
  }

  return (
    <Button
      extension="full"
      theme="secondary"
      icon={DownloadIcon}
      label={t('viewer.actions.download')}
      onClick={() => handleClick(file)}
    />
  )
}

DownloadButton.propTypes = {
  file: PropTypes.object.isRequired
}

export default withLocales(locales)(DownloadButton)
