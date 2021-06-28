import React, { useState, useEffect } from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

import papersJSON from '../../constants/papersDefinitions.json'
import Placeholder from './Placeholder'

const PlaceholdersList = ({ papers }) => {
  const [placeholders, setPlaceholders] = useState([])

  useEffect(() => {
    if (papers) {
      const ph = papersJSON.papersDefinitions.filter(
        pd =>
          !papers.some(
            paper => paper.label === pd.label && pd.featuredPlaceholder
          )
      )
      setPlaceholders(ph)
    }
  }, [papers])

  return (
    <List>
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
