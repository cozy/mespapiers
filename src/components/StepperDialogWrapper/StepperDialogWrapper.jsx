import React, { Fragment } from 'react'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import StepperDialog from 'src/components/StepperDialog/StepperDialog'
import LazyLoad from 'src/components/LazyLoad/LazyLoad'

const StepContent = () => {
  const { allCurrentSteps, currentStepIndex } = useStepperDialog()

  return allCurrentSteps.map(
    step =>
      step.stepIndex === currentStepIndex && (
        <Fragment key={step.stepIndex}>
          <LazyLoad currentStep={step} />
        </Fragment>
      )
  )
}

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
      content={<StepContent />}
      stepper={`${currentStepIndex}/${allCurrentSteps.length}`}
    />
  )
}

export default StepperDialogWrapper
