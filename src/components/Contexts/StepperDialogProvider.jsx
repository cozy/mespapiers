import React, { createContext, useCallback, useEffect, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(undefined)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')

  const [allCurrentSteps, setAllCurrentSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(1)
  const [currentDefinition, setCurrentDefinition] = useState(null)

  useEffect(() => {
    if (isStepperDialogOpen === false) {
      setCurrentDefinition(null)
      setStepperDialogTitle('')
      setAllCurrentSteps([])
      setCurrentStepIndex(1)
    }
  }, [isStepperDialogOpen])

  useEffect(() => {
    if (currentDefinition) {
      setStepperDialogTitle(currentDefinition.label)
      const allCurrentStepsDefinitions = currentDefinition.acquisitionSteps
      if (allCurrentStepsDefinitions.length > 0) {
        const allCurrentStepsDefinitionsSorted = allCurrentStepsDefinitions.sort(
          (a, b) => a.stepIndex - b.stepIndex
        )

        // TODO START - Just needed for Beta.4
        const clearTempOwner = allCurrentStepsDefinitionsSorted.filter(
          definition => definition.model.toLowerCase() !== 'owner'
        )
        // TODO END

        const { stepIndex: lastStepIndex } = clearTempOwner.slice(-1).pop()

        setAllCurrentSteps([
          ...clearTempOwner,
          {
            stepIndex: lastStepIndex + 1,
            illustration: 'Account.svg',
            text: 'PaperJSON.generic.owner.text',
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

  const stepperDialog = React.useMemo(
    () => ({
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
    }),
    [
      allCurrentSteps,
      currentDefinition,
      currentStepIndex,
      isStepperDialogOpen,
      stepperDialogTitle,
      setIsStepperDialogOpen,
      setCurrentStepIndex,
      setCurrentDefinition,
      setStepperDialogTitle,
      previousStep,
      nextStep
    ]
  )

  return (
    <StepperDialogContext.Provider value={stepperDialog}>
      {children}
    </StepperDialogContext.Provider>
  )
}

export default StepperDialogContext

export { StepperDialogProvider }
