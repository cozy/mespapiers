import React, { useMemo } from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllQualificationLabel } from 'src/helpers/queries'
import Home from 'src/components/Home/Home'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const HomeWrapper = () => {
  const { papersDefinitions } = usePapersDefinitions()

  const allQualificationLabel = useMemo(
    () => getAllQualificationLabel(papersDefinitions),
    [papersDefinitions]
  )
  const {
    data: allPapersLabel,
    hasMore,
    fetchMore,
    lastUpdate,
    ...rest
  } = useQuery(allQualificationLabel.definition, allQualificationLabel.options)

  if (hasMore) fetchMore()

  return isQueryLoading(rest) && !lastUpdate ? (
    <Spinner
      size="xxlarge"
      className="u-flex u-flex-justify-center u-mt-2 u-h-5"
    />
  ) : (
    <Home hasPapers={allPapersLabel?.length > 0} />
  )
}

export default React.memo(HomeWrapper)
