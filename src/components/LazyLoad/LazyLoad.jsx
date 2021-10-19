import React, { Suspense, useMemo, useEffect, memo, lazy } from 'react'
import capitalize from 'lodash/capitalize'

import log from 'cozy-logger'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'

const LazyLoadError = ({ currentStep }) => {
  const { setIsStepperDialogOpen, setCurrentStepIndex } = useStepperDialog()

  useEffect(() => {
    log(
      'error',
      `LazyLoadError: The Component model ${
        currentStep.model
          ? `'/ModelSteps/${currentStep.model}' not found`
          : 'is not defined in the JSON file'
      }`
    )
    setCurrentStepIndex(1)
    setIsStepperDialogOpen(false)
  }, [currentStep.model, setCurrentStepIndex, setIsStepperDialogOpen])

  return null
}

const LazyLoad = ({ currentStep }) => {
  const modelPage = capitalize(currentStep.model)
  const Component = useMemo(
    () =>
      lazy(() =>
        import(`src/components/ModelSteps/${modelPage}.jsx`).catch(() => ({
          default: LazyLoadError
        }))
      ),
    [modelPage]
  )
  if (!Component) return null

  return (
    <Suspense fallback={<></>}>
      <Component currentStep={currentStep} />
    </Suspense>
  )
}

export default memo(LazyLoad)
