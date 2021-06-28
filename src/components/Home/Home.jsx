import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Empty from 'cozy-ui/transpiled/react/Empty'
import { useI18n } from 'cozy-ui/react/I18n'

import HomeCloud from '../../assets/icons/HomeCloud.svg'

import { queryAllPapers } from '../../utils/queries'
import PapersList from '../Papers/PapersList'
import PlaceholdersList from '../Placeholders/PlaceholdersList'

const Home = () => {
  const { t } = useI18n()
  const { data, ...rest } = useQuery(
    queryAllPapers.definition,
    queryAllPapers.options
  )

  return (
    <>
      {isQueryLoading(rest) ? (
        <Spinner size="xxlarge" />
      ) : data.length === 0 ? (
        <Empty
          layout={false}
          icon={HomeCloud}
          title={t('NotFound.title')}
          text={t('NotFound.text')}
        />
      ) : (
        <PapersList papers={data} />
      )}
      <PlaceholdersList papers={data} />
    </>
  )
}

export default Home
