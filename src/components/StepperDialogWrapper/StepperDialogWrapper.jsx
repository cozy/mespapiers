import React from 'react'

import { useStepperDialogContext } from 'components/Hooks/useStepperDialogContext'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import StepperDialog from 'components/StepperDialog/StepperDialog'
import LazyLoad from 'components/LazyLoad/LazyLoad'

const Content = () => {
  const { allCurrentPages, currentPageIndex } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageIndex === currentPageIndex && (
        <React.Fragment key={page.pageIndex}>
          <LazyLoad currentPage={page} />
        </React.Fragment>
      )
  )
}

const StepperDialogWrapper = () => {
  const scannerT = useScannerI18n()
  const {
    allCurrentPages,
    currentPageIndex,
    previousPage,
    stepperDialogTitle
  } = useStepperDialogContext()

  return (
    <StepperDialog
      open
      onClose={previousPage}
      title={scannerT(`items.${stepperDialogTitle}`)}
      content={<Content />}
      stepper={`${currentPageIndex}/${allCurrentPages.length}`}
    />
  )
}

export default StepperDialogWrapper
