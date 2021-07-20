import React from 'react'

import { useDialogModalContext, useStepperContext } from '../Hooks'

const DialogInStepperWrapper = () => {
  const { currentPages } = useDialogModalContext()
  const { currentStep } = useStepperContext()

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
