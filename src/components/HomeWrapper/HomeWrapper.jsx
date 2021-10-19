import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllQualificationLabel } from 'src/helpers/queries'
import { useQueryCozy } from 'src/components/Hooks/useQueryCozy'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import StepperDialogWrapper from 'src/components/StepperDialogWrapper/StepperDialogWrapper'
import Home from 'src/components/Home/Home'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'

const HomeWrapper = () => {
  const { isStepperDialogOpen } = useStepperDialog()
  const { data: allPapersLabel, isQueryLoading } = useQueryCozy(
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

export default React.memo(HomeWrapper)
