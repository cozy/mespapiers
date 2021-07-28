import React from 'react'

import { useStepperDialogContext } from 'components/Hooks'

const StepperDialogWrapper = () => {
  const { allCurrentPages, currentPage } = useStepperDialogContext()

  return allCurrentPages.map((page, i) => (
    <React.Fragment key={i}>
      {page.pageNumber === currentPage && (
        <>
          {/* <StepperDialog ... title={via StepperDialogContext} content={<LazyLoad currentPage={page} />} ... */}
        </>
      )}
    </React.Fragment>
  ))
}

export default StepperDialogWrapper
