import React, { useContext } from 'react'

import { DialogModalContext, StepperContext } from '../Contexts'

const DialogInStepperWrapper = () => {
  const { currentPages } = useContext(DialogModalContext)
  const { currentStep } = useContext(StepperContext)

  return currentPages.map((page, i) => (
    <React.Fragment key={i}>
      {page.pageNumber === currentStep && (
        <>
          {/* <DialogInStepper ... title={via DialogModalContext} content={<LazyLoad currentPage={page} />} ... */}
        </>
      )}
    </React.Fragment>
  ))
}

export default DialogInStepperWrapper
