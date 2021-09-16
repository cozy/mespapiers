import React, { createContext, useCallback, useEffect, useState } from 'react'

const StepperDialogContext = createContext()

const StepperDialogProvider = ({ children }) => {
  const [isStepperDialogOpen, setIsStepperDialogOpen] = useState(false)
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')
  const [allCurrentPagesDefinitions, setAllCurrentPagesDefinitions] = useState(
    []
  )
  const [allCurrentPages, setAllCurrentPages] = useState([])
  const [currentPageIndex, setCurrentPageIndex] = useState(1)

  useEffect(() => {
    if (allCurrentPagesDefinitions.length > 0) {
      const allCurrentPagesDefinitionsSorted = allCurrentPagesDefinitions.sort(
        (a, b) => a.pageIndex - b.pageIndex
      )
      setAllCurrentPages(allCurrentPagesDefinitionsSorted)
    }
  }, [allCurrentPagesDefinitions])

  const previousPage = useCallback(() => {
    currentPageIndex > 1
      ? setCurrentPageIndex(prev => prev - 1)
      : setIsStepperDialogOpen(false)
  }, [currentPageIndex])

  const nextPage = useCallback(() => {
    allCurrentPages.length > currentPageIndex &&
      setCurrentPageIndex(prev => prev + 1)
  }, [allCurrentPages.length, currentPageIndex])

  const stepperDialog = {
    isStepperDialogOpen,
    allCurrentPages,
    currentPageIndex,
    stepperDialogTitle,
    setIsStepperDialogOpen,
    setCurrentPageIndex,
    setAllCurrentPagesDefinitions,
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
