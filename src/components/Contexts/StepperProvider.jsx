import React, { createContext, useState } from 'react'

const StepperContext = createContext()

const StepperProvider = ({ children }) => {
  const [{ currentStep, maxStep }, setStepper] = useState({
    currentStep: 1,
    maxStep: 1
  })

  const previousStep = () => {
    currentStep > 1 &&
      setStepper(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))
  }

  const nextStep = () => {
    maxStep > currentStep &&
      setStepper(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
  }

  const setMaxStep = maxStep => {
    setStepper(prev => ({ ...prev, maxStep }))
  }

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        maxStep,
        setMaxStep,
        nextStep,
        previousStep
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export default StepperContext

export { StepperProvider }
