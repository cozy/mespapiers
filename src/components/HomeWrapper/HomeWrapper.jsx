import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllPapers } from 'utils/queries'
import { useStepperDialogContext } from 'components/Hooks'
import { StepperDialogWrapper } from 'components/StepperDialogWrapper'
import Home from 'components/Home'

const HomeWrapper = () => {
  const { isStepperDialogOpen } = useStepperDialogContext()
  const { data, ...rest } = useQuery(
    getAllPapers.definition,
    getAllPapers.options
  )

  return !isStepperDialogOpen ? (
    isQueryLoading(rest) ? (
      <Spinner
        size="xxlarge"
        className="u-flex u-flex-justify-center u-mt-2 u-h-5"
      />
    ) : (
      <Home data={data || []} />
    )
  ) : (
    <StepperDialogWrapper />
  )
}

export default HomeWrapper
