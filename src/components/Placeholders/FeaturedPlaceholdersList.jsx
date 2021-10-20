import React, { useMemo } from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Placeholder from 'src/components/Placeholders/Placeholder'
import { getAllQualificationLabel } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import { getFeaturedPlaceholders } from 'src/utils/getPlaceholders'

const FeaturedPlaceholdersList = () => {
  const { t } = useI18n()
  const { data: allPapers } = useQuery(getAllQualificationLabel)
  const featuredPlaceholders = useMemo(
    () => getFeaturedPlaceholders(allPapers),
    [allPapers]
  )

  return (
    <List>
      {allPapers.length > 0 && (
        <ListSubheader>{t('FeaturedPlaceholdersList.subheader')}</ListSubheader>
      )}
      <div className={'u-pv-half'}>
        {featuredPlaceholders.map((placeholder, idx) => (
          <Placeholder
            key={idx}
            placeholder={placeholder}
            divider={idx !== featuredPlaceholders.length - 1}
          />
        ))}
      </div>
    </List>
  )
}

export default FeaturedPlaceholdersList
