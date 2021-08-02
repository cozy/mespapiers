import React from 'react'

import { useStepperDialogContext } from 'components/Hooks/useStepperDialogContext'
import { useScannerI18nContext } from 'components/Hooks/useScannerI18nContext'
import StepperDialog from 'components/StepperDialog/StepperDialog'

const StepperDialogWrapper = () => {
  const scannerT = useScannerI18nContext()
  const {
    allCurrentPages,
    currentPageIndex,
    stepperDialogTitle,
    previousPage
  } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageIndex === currentPageIndex && (
        <StepperDialog
          key={page.pageIndex}
          open
          onClose={previousPage}
          title={scannerT(`Scan.items.${stepperDialogTitle}`)}
          // TODO content={<LazyloadComponent />}
          stepper={`${currentPageIndex}/${allCurrentPages.length}`}
        />
      )
  )
}

export default StepperDialogWrapper
