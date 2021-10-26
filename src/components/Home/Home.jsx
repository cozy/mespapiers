import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import PaperGroup from 'src/components/Papers/PaperGroup'
import FeaturedPlaceholdersList from 'src/components/Placeholders/FeaturedPlaceholdersList'
import PlaceholderThemesList from 'src/components/Placeholders/PlaceholderThemesList'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'

const Home = ({ hasPapers }) => {
  const { t } = useI18n()
  const [showPlaceholderThemesList, setShowPlaceholderThemesList] = useState(
    false
  )
  const hideAllPapersChoices = useCallback(
    () => setShowPlaceholderThemesList(false),
    []
  )
  const showAllPapersChoices = useCallback(
    () => setShowPlaceholderThemesList(true),
    []
  )

  return (
    <>
      {!hasPapers ? (
        <Empty
          icon={HomeCloud}
          iconSize={'large'}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
          layout={false}
          className={'u-ph-1'}
        />
      ) : (
        <PaperGroup />
      )}
      <FeaturedPlaceholdersList />
      <Fab
        color="primary"
        aria-label={t('Home.Fab.ariaLabel')}
        style={{ position: 'fixed' }}
        className="u-bottom-m u-right-m"
        onClick={showAllPapersChoices}
      >
        <Icon icon={PlusIcon} />
      </Fab>
      {showPlaceholderThemesList && (
        <PlaceholderThemesList
          title={t('PlaceholdersList.title', { name: '' })}
          onClose={hideAllPapersChoices}
        />
      )}
    </>
  )
}

Home.propTypes = {
  hasPapers: PropTypes.bool.isRequired
}

export default React.memo(Home)
