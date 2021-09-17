import React, { createContext, useCallback, useEffect, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(false)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')
  const [allCurrentStepsDefinitions, setAllCurrentStepsDefinitions] = useState(
    []
  )
  const [allCurrentSteps, setAllCurrentSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(1)

  useEffect(() => {
    if (allCurrentStepsDefinitions.length > 0) {
      const allCurrentStepsDefinitionsSorted = allCurrentStepsDefinitions.sort(
        (a, b) => a.stepIndex - b.stepIndex
      )
      setAllCurrentSteps(allCurrentStepsDefinitionsSorted)
    }
  }, [allCurrentStepsDefinitions])

  const previousStep = useCallback(() => {
    currentStepIndex > 1
      ? setCurrentStepIndex(prev => prev - 1)
      : setIsStepperDialogOpen(false)
  }, [currentStepIndex])

  const nextStep = useCallback(() => {
    allCurrentSteps.length > currentStepIndex &&
      setCurrentStepIndex(prev => prev + 1)
  }, [allCurrentSteps.length, currentStepIndex])

  const stepperDialog = {
    isStepperDialogOpen,
    allCurrentSteps,
    currentStepIndex,
    stepperDialogTitle,
    setIsStepperDialogOpen,
    setCurrentStepIndex,
    setAllCurrentStepsDefinitions,
    setStepperDialogTitle,
    previousStep,
    nextStep
  }

  return (
    <StepperDialogContext.Provider value={stepperDialog}>
      {children}
    </StepperDialogContext.Provider>
  )
}

export default StepperDialogContext

export { StepperDialogProvider }
