import React, { createContext, useCallback, useEffect, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(false)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')

  const [allCurrentSteps, setAllCurrentSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(1)
  const [currentDefinition, setCurrentDefinition] = useState(null)

  useEffect(() => {
    if (currentDefinition) {
      setStepperDialogTitle(currentDefinition.label)
      const allCurrentStepsDefinitions = currentDefinition.steps
      if (allCurrentStepsDefinitions.length > 0) {
        const allCurrentStepsDefinitionsSorted = allCurrentStepsDefinitions.sort(
          (a, b) => a.stepIndex - b.stepIndex
        )

        const {
          stepIndex: lastStepIndex
        } = allCurrentStepsDefinitionsSorted.slice(-1).pop()
        setAllCurrentSteps([
          ...allCurrentStepsDefinitionsSorted,
          {
            stepIndex: lastStepIndex + 1,
            illustration: 'Account.svg',
            text: 'ContactAdapter.description',
            model: 'contact'
          }
        ])
      }
    }
  }, [currentDefinition])

  const previousStep = useCallback(() => {
    if (currentStepIndex > 1) {
      setCurrentStepIndex(prev => prev - 1)
    } else {
      setIsStepperDialogOpen(false)
    }
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
    currentDefinition,
    setIsStepperDialogOpen,
    setCurrentStepIndex,
    setCurrentDefinition,
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
