import { useContext } from 'react'
import StepperDialogContext from 'components/Contexts/StepperDialogProvider'

export const useStepperDialogContext = () => {
  const stepperDialogContext = useContext(StepperDialogContext)
  if (!stepperDialogContext) {
    throw new Error(
      'useStepperDialogContext must be used within a StepperDialogProvider'
    )
  }
  return stepperDialogContext
}
