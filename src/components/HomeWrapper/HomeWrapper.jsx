import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllQualificationLabel } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import StepperDialogWrapper from 'src/components/StepperDialogWrapper/StepperDialogWrapper'
import Home from 'src/components/Home/Home'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'

const HomeWrapper = () => {
  const { isStepperDialogOpen } = useStepperDialogContext()
  const { data: allPapersLabel, isQueryLoading } = useQuery(
    getAllQualificationLabel
  )

  return !isStepperDialogOpen ? (
    isQueryLoading ? (
      <Spinner
        size="xxlarge"
        className="u-flex u-flex-justify-center u-mt-2 u-h-5"
      />
    ) : (
      <Home hasPapers={allPapersLabel.length > 0} />
    )
  ) : (
    <FormDataProvider>
      <StepperDialogWrapper />
    </FormDataProvider>
  )
}

export default HomeWrapper
