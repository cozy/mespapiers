import React, { createContext, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(false)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')
  const [currentPages, setCurrentPages] = useState([])

  const stepperDialog = {
    isStepperDialogOpen,
    setIsStepperDialogOpen,
    currentPages,
    setCurrentPages,
    stepperDialogTitle,
    setStepperDialogTitle
  }

  return (
    <StepperDialogContext.Provider value={stepperDialog}>
      {children}
    </StepperDialogContext.Provider>
  )
}

export default StepperDialogContext

export { StepperDialogProvider }
