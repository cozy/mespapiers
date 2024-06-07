import React from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'

import Typography from 'cozy-ui/transpiled/react/Typography'

const StepperDialogTitle = () => {
  const scannerT = useScannerI18n()
  const {
    allCurrentSteps,
    currentStepIndex,
    currentDefinition,
    stepperDialogTitle
  } = useStepperDialog()

  return (
    <>
      {scannerT(`items.${stepperDialogTitle}`, {
        country: currentDefinition.country
      })}
      <Typography variant="h6">
        {`${currentStepIndex + 1}/${allCurrentSteps.length}`}
      </Typography>
    </>
  )
}

export default StepperDialogTitle
