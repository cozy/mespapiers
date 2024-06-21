import PropTypes from 'prop-types'
import React from 'react'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { MultiSelectPaperItem } from 'src/components/Multiselect/MultiSelectPaperItem'

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

export const PaperCardItem = ({
  item,
  paperIndex,
  className,
  square = false
}) => {
  const classes = useStyles(square)
  const { removeMultiSelectionItemByIndex } = useMultiSelection()

  return (
    <Paper className={`u-h-3 ${className}`} square={square}>
      <MultiSelectPaperItem item={item} classes={classes}>
        <IconButton
          color="error"
          onClick={() => removeMultiSelectionItemByIndex(paperIndex)}
        >
          <Icon icon="cross-circle" />
        </IconButton>
      </MultiSelectPaperItem>
    </Paper>
  )
}

PaperCardItem.propTypes = {
  item: PropTypes.shape({
    file: PropTypes.object.isRequired,
    page: PropTypes.number
  }).isRequired,
  paperIndex: PropTypes.number,
  className: PropTypes.string,
  square: PropTypes.bool
}

export default PaperCardItem
