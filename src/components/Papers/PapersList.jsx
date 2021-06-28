import React from 'react'
import PropTypes from 'prop-types'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import Paper from './Paper'

const PapersList = ({ papers }) => {
  return (
    <List>
      {papers.map((paper, idx) => (
        <Paper key={idx} paper={paper} divider={idx !== papers.length - 1} />
      ))}
    </List>
  )
}

PapersList.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.object).isRequired
}
PapersList.defaultProps = {
  papers: []
}

export default PapersList
