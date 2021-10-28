import React from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Empty from 'cozy-ui/transpiled/react/Empty'

import PaperGroup from 'src/components/Papers/PaperGroup'
import FeaturedPlaceholdersList from 'src/components/Placeholders/FeaturedPlaceholdersList'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'

const Home = ({ hasPapers }) => {
  const { t } = useI18n()

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
    </>
  )
}

Home.propTypes = {
  hasPapers: PropTypes.bool.isRequired
}

export default React.memo(Home)
