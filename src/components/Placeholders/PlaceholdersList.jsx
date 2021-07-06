import React, { useState, useEffect } from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/react/I18n'

import { Placeholder } from '.'
import { getPlaceholders } from '../../utils/placeholder'

const PlaceholdersList = ({ papers }) => {
  const { t } = useI18n()
  const [placeholders, setPlaceholders] = useState([])

  useEffect(() => {
    setPlaceholders(getPlaceholders(papers))
  }, [papers])

  return (
    <List>
      {papers.length > 0 && (
        <ListSubheader>
          {t('PlaceholdersList.List.ListSubheader')}
        </ListSubheader>
      )}
      {placeholders.map((placeholder, idx) => (
        <Placeholder
          key={idx}
          placeholder={placeholder}
          divider={idx !== placeholders.length - 1}
        />
      ))}
    </List>
  )
}

export default PlaceholdersList
