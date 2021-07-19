import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Empty } from 'cozy-ui/transpiled/react'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import { PapersList } from '../Papers'
import { PlaceholdersList } from '../Placeholders'
import HomeCloud from '../../assets/icons/HomeCloud.svg'

const Home = ({ data }) => {
  const { t } = useI18n()

  return (
    <>
      {data.length === 0 ? (
        <Empty
          icon={HomeCloud}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
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
