import { useContext } from 'react'
import { StepperContext } from '../Contexts'

export const useStepperContext = () => {
  const stepperContext = useContext(StepperContext)
  if (!stepperContext) {
    throw new Error('useStepperContext must be used within a StepperProvider')
  }
  return stepperContext
}
