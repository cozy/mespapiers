import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import withLocales from 'cozy-ui/transpiled/react/I18n/withLocales'

import getPanelBlocks, { panelBlocksSpecs } from './getPanelBlocks'
import fr from '../locales/fr.json'
import en from '../locales/fr.json'

const locales = { fr, en }

const PanelContent = ({ file, t }) => {
  const panelBlocks = getPanelBlocks({ panelBlocksSpecs, file })

  return (
    <Stack spacing="s" className={cx('u-flex u-flex-column u-h-100')}>
      <Paper
        className={'u-ph-2 u-flex u-flex-items-center u-h-3'}
        elevation={2}
        square
      >
        <Typography variant="h4">{t('Viewer.panel.title')}</Typography>
      </Paper>
      {panelBlocks.map((PanelBlock, index) => (
        <Paper
          key={index}
          className={cx({
            'u-flex-grow-1': index === panelBlocks.length - 1
          })}
          elevation={2}
          square
        >
          <Typography variant="h4">
            <PanelBlock file={file} />
          </Typography>
        </Paper>
      ))}
    </Stack>
  )
}

PanelContent.propTypes = {
  file: PropTypes.object.isRequired
}

export default withLocales(locales)(PanelContent)
