import { useContext } from 'react'
import { StepperDialogContext } from '../Contexts'

export const useStepperDialogContext = () => {
  const stepperDialogContext = useContext(StepperDialogContext)
  if (!stepperDialogContext) {
    throw new Error(
      'useStepperDialogContext must be used within a StepperDialogProvider'
    )
  }
  return stepperDialogContext
}
