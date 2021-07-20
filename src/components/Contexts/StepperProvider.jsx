import React, { createContext, useState } from 'react'

import useCycle from 'cozy-ui/transpiled/react/hooks/useCycle'

const StepperContext = createContext()

const StepperProvider = ({ children }) => {
  const [maxStep, setMaxStep] = useState(1)

  // REVIEW Check relevance to use `useCycle`
  const [currentStep, setPrev, setNext] = useCycle(1, 1, maxStep)

  const previousStep = () => {
    currentStep > 1 && setPrev()
  }

  const nextStep = () => {
    maxStep > currentStep && setNext()
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
