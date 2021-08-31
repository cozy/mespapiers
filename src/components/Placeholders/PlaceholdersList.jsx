import React, { useMemo } from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Placeholder from 'src/components/Placeholders/Placeholder'
import { getAllPapers } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import { getPlaceholders } from 'src/utils/getPlaceholders'

const PlaceholdersList = () => {
  const { t } = useI18n()
  const { allPapers } = useQuery(getAllPapers)
  const allPlaceholders = useMemo(() => getPlaceholders(allPapers || []), [
    allPapers
  ])

  return (
    <List>
      {allPapers.length > 0 && (
        <ListSubheader>{t('PlaceholdersList.subheader')}</ListSubheader>
      )}
      <div className={'u-pv-half'}>
        {allPlaceholders.map((placeholder, idx) => (
          <Placeholder
            key={idx}
            placeholder={placeholder}
            divider={idx !== allPlaceholders.length - 1}
          />
        ))}
      </div>
    </List>
  )
}

export default PlaceholdersList
