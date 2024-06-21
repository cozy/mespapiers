import PropTypes from 'prop-types'
import React from 'react'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import PaperItem from 'src/components/Papers/PaperItem'

import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles(theme => ({
  root: {
    // This values corresponds to the value of the property `border-radius` of the component Paper of MUI
    borderRadius: square => (square ? 0 : theme.shape.borderRadius),
    height: '100%'
  },
  container: {
    height: '100%'
  }
}))

const PaperCardItem = ({
  paper,
  paperIndex,
  divider,
  className,
  square = false
}) => {
  const classes = useStyles(square)
  const { removeMultiSelectionItemByIndex } = useMultiSelection()

  return (
    <Paper className={`u-h-3 ${className}`} square={square}>
      <PaperItem paper={paper} divider={divider} classes={classes}>
        <IconButton
          color="error"
          onClick={() => removeMultiSelectionItemByIndex(paperIndex)}
        >
          <Icon icon="cross-circle" />
        </IconButton>
      </PaperItem>
    </Paper>
  )
}

PaperCardItem.propTypes = {
  paper: PropTypes.object.isRequired,
  divider: PropTypes.bool,
  className: PropTypes.string,
  square: PropTypes.bool
}

export default PaperCardItem
