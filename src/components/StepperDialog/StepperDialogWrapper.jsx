import React from 'react'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import StepperDialog from 'src/components/StepperDialog/StepperDialog'
import StepperDialogContent from 'src/components/StepperDialog/StepperDialogContent'

const StepperDialogWrapper = () => {
  const scannerT = useScannerI18n()
  const {
    allCurrentSteps,
    currentStepIndex,
    previousStep,
    stepperDialogTitle
  } = useStepperDialog()

  return (
    <StepperDialog
      open
      onClose={previousStep}
      title={scannerT(`items.${stepperDialogTitle}`)}
      content={<StepperDialogContent />}
      stepper={`${currentStepIndex}/${allCurrentSteps.length}`}
    />
  )
}

export default StepperDialogWrapper
