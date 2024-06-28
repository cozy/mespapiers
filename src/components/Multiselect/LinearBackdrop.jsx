import React from 'react'

import Backdrop from 'cozy-ui/transpiled/react/Backdrop'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles(theme => ({
  backdropRoot: {
    zIndex: 'calc(var(--zIndex-modal) + 1)'
  },
  barText: {
    color: 'var(--primaryContrastTextColor)'
  },
  bar: {
    borderRadius: theme.shape.borderRadius
  },
  barBackgroundColorPrimary: {
    backgroundColor: 'var(--secondaryTextColor)'
  },
  barBackgroundActiveColorPrimary: {
    backgroundColor: 'var(--primaryContrastTextColor)'
  }
}))

export const LinearBackdrop = ({ text }) => {
  const classes = useStyles()

  return (
    <Backdrop classes={{ root: classes.backdropRoot }} open>
      <div className="u-w-100 u-mh-2 u-ta-center">
        {text && (
          <Typography classes={{ root: classes.barText }} className="u-mb-1">
            {text}
          </Typography>
        )}
        <LinearProgress
          classes={{
            root: classes.bar,
            colorPrimary: classes.barBackgroundColorPrimary,
            barColorPrimary: classes.barBackgroundActiveColorPrimary
          }}
        />
      </div>
    </Backdrop>
  )
}
