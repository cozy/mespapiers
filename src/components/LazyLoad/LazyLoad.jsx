import React, { Suspense, useMemo, useEffect, memo, lazy } from 'react'
import capitalize from 'lodash/capitalize'

import log from 'cozy-logger'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'

const LazyLoadError = err => {
  const { setIsStepperDialogOpen } = useStepperDialogContext()

  useEffect(() => {
    log(
      'error',
      `LazyLoadError: The Component model ${
        err.currentPage.model
          ? `'/ModelPages/${err.currentPage.model}' not found`
          : 'is not defined in the JSON file'
      }`
    )
    setIsStepperDialogOpen(false)
  }, [err, setIsStepperDialogOpen])

  return null
}

const LazyLoad = ({ currentPage }) => {
  const modelPage = capitalize(currentPage.model)
  const Component = useMemo(
    () =>
      lazy(() =>
        import(`../ModelPages/${modelPage}.jsx`).catch(() => ({
          default: LazyLoadError
        }))
      ),
    [modelPage]
  )
  if (!Component) return null

  return (
    <Suspense fallback={<div />}>
      <Component currentPage={currentPage} />
    </Suspense>
  )
}

export default memo(LazyLoad)
