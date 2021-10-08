import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

import Paper from 'cozy-ui/transpiled/react/Paper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Stack from 'cozy-ui/transpiled/react/Stack'

import Sharing from './Sharing'
import getPanelBlocks, { panelBlocksSpecs } from '../Panel/getPanelBlocks'

const useStyles = makeStyles(theme => ({
  stack: {
    backgroundColor: theme.palette.background.default
  }
}))

const BottomSheetContent = forwardRef(({ file, FileActionButton }, ref) => {
  const panelBlocks = getPanelBlocks({ panelBlocksSpecs, file })
  const styles = useStyles()

  return (
    <Stack
      spacing="s"
      className={cx('u-flex u-flex-column u-ov-hidden', styles.stack)}
    >
      <Paper className={'u-flex u-ph-1 u-pb-1'} elevation={2} square ref={ref}>
        <Sharing file={file} />
        <FileActionButton file={file} />
      </Paper>
      {panelBlocks.map((PanelBlock, index) => (
        <Paper
          key={index}
          elevation={index === panelBlocks.length - 1 ? 0 : 2}
          square
        >
          <Typography variant="h4">
            <PanelBlock file={file} />
          </Typography>
        </Paper>
      ))}
    </Stack>
  )
})

BottomSheetContent.propTypes = {
  file: PropTypes.object.isRequired
}

export default BottomSheetContent
