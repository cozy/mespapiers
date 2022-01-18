import React, { useMemo } from 'react'
import uniqBy from 'lodash/uniqBy'

import { hasQueryBeenLoaded, isQueryLoading, useQuery } from 'cozy-client'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import PaperGroup from 'src/components/Papers/PaperGroup'
import { PapersFab } from 'src/components/PapersFab/PapersFab'
import FeaturedPlaceholdersList from 'src/components/Placeholders/FeaturedPlaceholdersList'
import { getAllQualificationLabel } from 'src/helpers/queries'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { getFeaturedPlaceholders } from 'src/helpers/findPlaceholders'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'

const Home = () => {
  const { t } = useI18n()
  const { papersDefinitions } = usePapersDefinitions()
  const allQualificationLabel = useMemo(
    () => getAllQualificationLabel(papersDefinitions),
    [papersDefinitions]
  )
  const {
    data: allPapers,
    hasMore: hasMorePapers,
    fetchMore: fetchMorePapers,
    ...restPapers
  } = useQuery(allQualificationLabel.definition, allQualificationLabel.options)

  const isQueryOver = useMemo(
    () =>
      !isQueryLoading(restPapers) &&
      hasQueryBeenLoaded(restPapers) &&
      !hasMorePapers,
    [hasMorePapers, restPapers]
  )

  if (hasMorePapers) fetchMorePapers()

  const featuredPlaceholders = useMemo(
    () =>
      Array.isArray(allPapers) && isQueryOver
        ? getFeaturedPlaceholders(papersDefinitions, allPapers)
        : [],
    [allPapers, isQueryOver, papersDefinitions]
  )

  const allPapersByCategories = useMemo(
    () =>
      allPapers?.length > 0 && isQueryOver
        ? uniqBy(allPapers, 'metadata.qualification.label')
        : [],
    [allPapers, isQueryOver]
  )

  return isQueryOver ? (
    <>
      {allPapersByCategories.length === 0 ? (
        <Empty
          icon={HomeCloud}
          iconSize={'large'}
          title={t('Home.Empty.title')}
          text={t('Home.Empty.text')}
          className={'u-ph-1'}
        />
      ) : (
        <PaperGroup allPapersByCategories={allPapersByCategories} />
      )}
      <FeaturedPlaceholdersList featuredPlaceholders={featuredPlaceholders} />
      <PapersFab />
    </>
  ) : (
    <Spinner
      size="xxlarge"
      className="u-flex u-flex-justify-center u-mt-2 u-h-5"
    />
  )
}

export default Home
