import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext
} from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { usePapersDefinitions } from 'src/components/Contexts/PapersDefinitionsProvider'
import { filterSteps } from 'src/helpers/filterSteps'
import { findPlaceholderByLabelAndCountry } from 'src/helpers/findPlaceholders'
import {
  CREATE_PAPER_DATA_BACKUP_CURRENT_STEP_INDEX,
  getAndRemoveIndexedStorageData
} from 'src/helpers/indexedStorage'

import { useWebviewIntent } from 'cozy-intent'

const StepperDialogContext = createContext()

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.isEdit - True if the dialog is in edit mode
 * @param {function} props.stepFilterFn - The filter function to apply on the steps
 */
export const StepperDialogProvider = ({ children, isEdit, stepFilterFn }) => {
  const [stepperDialogTitle, setStepperDialogTitle] = useState('')
  const [allCurrentSteps, setAllCurrentSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [currentDefinition, setCurrentDefinition] = useState(null)
  const { papersDefinitions } = usePapersDefinitions()
  const webviewIntent = useWebviewIntent()
  const [searchParams] = useSearchParams()
  const { qualificationLabel } = useParams()

  const isReady = allCurrentSteps.length > 0 && currentStepIndex !== -1

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')
  const country = searchParams.get('country')

  const resetStepperDialog = () => {
    setCurrentDefinition(null)
    setStepperDialogTitle('')
    setAllCurrentSteps([])
    setCurrentStepIndex(0)
  }

  const allPlaceholders = useMemo(
    () =>
      findPlaceholderByLabelAndCountry(
        papersDefinitions,
        qualificationLabel,
        country
      ),
    [qualificationLabel, papersDefinitions, country]
  )

  const formModel = allPlaceholders[0]

  useEffect(() => {
    if (formModel && currentDefinition !== formModel) {
      setCurrentDefinition(formModel)
    }
  }, [formModel, currentDefinition, setCurrentDefinition])

  useEffect(() => {
    if (currentDefinition) {
      const buildAllCurrentSteps = async () => {
        setStepperDialogTitle(currentDefinition.label)
        const allCurrentStepsDefinitions = currentDefinition.acquisitionSteps
        if (allCurrentStepsDefinitions.length > 0) {
          const filteredSteps = await filterSteps({
            steps: allCurrentStepsDefinitions,
            webviewIntent,
            isEdit,
            stepFilterFn,
            fromFlagshipUpload
          })
          setAllCurrentSteps(filteredSteps)
        }
      }
      buildAllCurrentSteps()
    }
  }, [
    webviewIntent,
    currentDefinition,
    fromFlagshipUpload,
    isEdit,
    stepFilterFn
  ])

  useEffect(() => {
    const loadCreatePaperDataBackup = async () => {
      const currentStepIndexBackup = await getAndRemoveIndexedStorageData(
        CREATE_PAPER_DATA_BACKUP_CURRENT_STEP_INDEX
      )

      if (currentStepIndexBackup) {
        setCurrentStepIndex(currentStepIndexBackup)
      } else {
        setCurrentStepIndex(0)
      }
    }

    loadCreatePaperDataBackup()
  }, [])

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const nextStep = () => {
    allCurrentSteps.length > currentStepIndex + 1 &&
      setCurrentStepIndex(prev => prev + 1)
  }

  /**
   * @param {string} modelStep - The model of the step to check
   * @returns {boolean} - True if the step is the last step of the model
   */
  const isLastStep = modelStep => {
    if (!modelStep) return currentStepIndex + 1 === allCurrentSteps.length

    const lastScanIndex = allCurrentSteps.findLastIndex(
      step => step.model === modelStep
    )
    return lastScanIndex === currentStepIndex
  }

  const stepperDialog = {
    allCurrentSteps,
    currentStepIndex,
    isEdit,
    setCurrentStepIndex,
    stepperDialogTitle,
    currentDefinition,
    isLastStep,
    setCurrentDefinition,
    previousStep,
    nextStep,
    resetStepperDialog
  }

  if (!isReady) {
    return null
  }

  return (
    <StepperDialogContext.Provider value={stepperDialog}>
      {children}
    </StepperDialogContext.Provider>
  )
}

export const useStepperDialog = () => {
  const stepperDialogContext = useContext(StepperDialogContext)
  if (!stepperDialogContext) {
    throw new Error(
      'useStepperDialog must be used within a StepperDialogProvider'
    )
  }
  return stepperDialogContext
}
