import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Empty } from 'cozy-ui/transpiled/react'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import PapersList from 'src/components/Papers/PapersList'
import PlaceholdersList from 'src/components/Placeholders/PlaceholdersList'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'

const Home = ({ allPapers }) => {
  const { t } = useI18n()

  return (
    <>
      {allPapers.length === 0 ? (
        <Empty
          icon={HomeCloud}
          iconSize={'large'}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
          layout={false}
          className={'u-ph-1'}
        />
      ) : (
        <PapersList />
      )}
      <PlaceholdersList />
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed' }}
        className="u-bottom-l u-right-l"
      >
        <Icon icon={PlusIcon} />
      </Fab>
    </>
  )
}

export default Home
