import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Placeholder from 'src/components/Placeholders/Placeholder'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const FeaturedPlaceholdersList = ({ featuredPlaceholders }) => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()

  return (
    <List>
      {featuredPlaceholders.length > 0 && (
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

FeaturedPlaceholdersList.propTypes = {
  featuredPlaceholders: PropTypes.arrayOf(PropTypes.object)
}

export default FeaturedPlaceholdersList
