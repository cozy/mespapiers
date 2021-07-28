import React from 'react'

import { useStepperDialogContext } from 'components/Hooks'

const StepperDialogWrapper = () => {
  const { allCurrentPages, currentPageIndex } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageIndex === currentPageIndex && (
        <React.Fragment key={page.pageIndex}></React.Fragment>
      )
  )
}

export default StepperDialogWrapper
