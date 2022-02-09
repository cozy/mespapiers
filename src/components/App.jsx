import React from 'react'
import { hot } from 'react-hot-loader'

import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { AppLayout } from 'src/components/AppLayout'
import { AppRouter } from 'src/components/AppRouter'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

export const App = () => {
  const { isStepperDialogOpen } = useStepperDialog()
  const { papersDefinitions } = usePapersDefinitions()

  return (
    <AppLayout>
      {papersDefinitions.length === 0 ? (
        <Spinner
          size="xxlarge"
          className="u-flex u-flex-justify-center u-mt-2 u-h-5"
        />
      ) : (
        <AppRouter />
      )}
      {isStepperDialogOpen && (
        <FormDataProvider>
          <StepperDialogWrapper />
        </FormDataProvider>
      )}
    </AppLayout>
  )
}

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
