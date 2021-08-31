import React from 'react'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import StepperDialog from 'src/components/StepperDialog/StepperDialog'
import FormSchema from 'src/components/Form/FormSchema'

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
      content={<FormSchema />}
      stepper={`${currentPageIndex}/${allCurrentPages.length}`}
    />
  )
}

export default StepperDialogWrapper
