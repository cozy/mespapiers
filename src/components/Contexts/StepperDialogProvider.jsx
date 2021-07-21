import React, { createContext, useCallback, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(false)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')
  const [allCurrentPages, setAllCurrentPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const previousPage = useCallback(() => {
    currentPage > 1
      ? setCurrentPage(prev => prev - 1)
      : setIsStepperDialogOpen(false)
  }, [currentPage])

  const nextPage = useCallback(() => {
    allCurrentPages.length > currentPage && setCurrentPage(prev => prev + 1)
  }, [currentPage, allCurrentPages.length])

  const stepperDialog = {
    isStepperDialogOpen,
    allCurrentPages,
    currentPage,
    stepperDialogTitle,
    setIsStepperDialogOpen,
    setAllCurrentPages,
    setStepperDialogTitle,
    previousPage,
    nextPage
  }

  return (
    <StepperDialogContext.Provider value={stepperDialog}>
      {children}
    </StepperDialogContext.Provider>
  )
}

export default StepperDialogContext

export { StepperDialogProvider }
