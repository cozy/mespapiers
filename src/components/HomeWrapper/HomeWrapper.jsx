import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllPapers } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import StepperDialogWrapper from 'src/components/StepperDialogWrapper/StepperDialogWrapper'
import Home from 'src/components/Home/Home'

const HomeWrapper = () => {
  const { isStepperDialogOpen } = useStepperDialogContext()
  const { allPapers, isQueryLoading } = useQuery(getAllPapers)

  return !isStepperDialogOpen ? (
    isQueryLoading ? (
      <Spinner
        size="xxlarge"
        className="u-flex u-flex-justify-center u-mt-2 u-h-5"
      />
    ) : (
      <Home allPapers={allPapers || []} />
    )
  ) : (
    <StepperDialogWrapper />
  )
}

export default HomeWrapper
