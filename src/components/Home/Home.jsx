import React from 'react'

import { Empty } from 'cozy-ui/transpiled/react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import PapersList from 'components/Papers/PapersList'
import PlaceholdersList from 'components/Placeholders/PlaceholdersList'
import HomeCloud from 'assets/icons/HomeCloud.svg'

const Home = ({ data }) => {
  const { t } = useI18n()

  return (
    <>
      {data.length === 0 ? (
        <Empty
          icon={HomeCloud}
          title={t('home.empty.title')}
          text={t('home.empty.text')}
          layout={false}
        />
      ) : (
        <PapersList papers={data} />
      )}
      <PlaceholdersList papers={data} />
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
