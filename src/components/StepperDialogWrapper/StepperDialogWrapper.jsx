import React from 'react'

import { useStepperDialogContext, useStepperContext } from '../Hooks'

const StepperDialogWrapper = () => {
  const { currentPages } = useStepperDialogContext()
  const { currentStep } = useStepperContext()

  return currentPages.map((page, i) => (
    <React.Fragment key={i}>
      {page.pageNumber === currentStep && (
        <>
          {/* <StepperDialog ... title={via StepperDialogContext} content={<LazyLoad currentPage={page} />} ... */}
        </>
      )}
    </React.Fragment>
  ))
}

export default StepperDialogWrapper
