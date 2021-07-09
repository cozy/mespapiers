import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import HomeCloud from '../../assets/icons/HomeCloud.svg'

import { getAllPapers } from '../../utils/queries'
import { PapersList } from '../Papers'
import { PlaceholdersList } from '../Placeholders'
import CompositeHeader from '../CompositeHeader'

const Home = () => {
  const { t } = useI18n()
  const { data, ...rest } = useQuery(
    getAllPapers.definition,
    getAllPapers.options
  )

  return (
    <>
      {isQueryLoading(rest) ? (
        <Spinner
          size="xxlarge"
          className="u-flex u-flex-justify-center u-mt-2 u-h-5"
        />
      ) : data && data.length === 0 ? (
        <CompositeHeader
          icon={HomeCloud}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
        />
      ) : (
        <PapersList papers={data || []} />
      )}
      <PlaceholdersList papers={data || []} />
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
