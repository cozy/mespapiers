import React, { Fragment } from 'react'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import StepperDialog from 'src/components/StepperDialog/StepperDialog'
import LazyLoad from 'src/components/LazyLoad/LazyLoad'

const PageContent = () => {
  const { allCurrentPages, currentPageIndex } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageIndex === currentPageIndex && (
        <Fragment key={page.pageIndex}>
          <LazyLoad currentPage={page} />
        </Fragment>
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
      content={<PageContent />}
      stepper={`${currentPageIndex}/${allCurrentPages.length}`}
    />
  )
}

export default StepperDialogWrapper
