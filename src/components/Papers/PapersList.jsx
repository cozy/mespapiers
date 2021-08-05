import React from 'react'
import PropTypes from 'prop-types'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Paper from 'src/components/Papers/Paper'

const PapersList = ({ papers }) => {
  const { t } = useI18n()

  return (
    <List>
      <ListSubheader>{t('PapersList.List.ListSubheader')}</ListSubheader>
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
