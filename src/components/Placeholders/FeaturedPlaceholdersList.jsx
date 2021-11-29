import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useQuery } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Placeholder from 'src/components/Placeholders/Placeholder'
import { getAllQualificationLabel } from 'src/helpers/queries'
import { getFeaturedPlaceholders } from 'src/helpers/findPlaceholders'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const FeaturedPlaceholdersList = () => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const { papersDefinitions } = usePapersDefinitions()

  const allQualificationLabel = useMemo(
    () => getAllQualificationLabel(papersDefinitions),
    [papersDefinitions]
  )
  const { data: allPapers } = useQuery(
    allQualificationLabel.definition,
    allQualificationLabel.options
  )

  const featuredPlaceholders = useMemo(
    () => getFeaturedPlaceholders(papersDefinitions, allPapers),
    [allPapers, papersDefinitions]
  )

  return (
    <List>
      {allPapers?.length > 0 && featuredPlaceholders.length > 0 && (
        <ListSubheader classes={isMobile && classes}>
          {t('FeaturedPlaceholdersList.subheader')}
        </ListSubheader>
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
