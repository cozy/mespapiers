import React, { Suspense, useMemo, useEffect, memo, lazy } from 'react'
import capitalize from 'lodash/capitalize'

import log from 'cozy-logger'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'

const LazyLoadError = ({ currentPage }) => {
  const {
    setIsStepperDialogOpen,
    setCurrentPageIndex
  } = useStepperDialogContext()

  useEffect(() => {
    log(
      'error',
      `LazyLoadError: The Component model ${
        currentPage.model
          ? `'/ModelPages/${currentPage.model}' not found`
          : 'is not defined in the JSON file'
      }`
    )
    setCurrentPageIndex(1)
    setIsStepperDialogOpen(false)
  }, [currentPage.model, setCurrentPageIndex, setIsStepperDialogOpen])

  return null
}

const LazyLoad = ({ currentPage }) => {
  const modelPage = capitalize(currentPage.model)
  const Component = useMemo(
    () =>
      lazy(() =>
        import(`src/components/ModelPages/${modelPage}.jsx`).catch(() => ({
          default: LazyLoadError
        }))
      ),
    [modelPage]
  )
  if (!Component) return null

  return (
    <Suspense fallback={<></>}>
      <Component currentPage={currentPage} />
    </Suspense>
  )
}

export default memo(LazyLoad)
