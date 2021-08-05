import React from 'react'
import { HashRouter } from 'react-router-dom'

import { CozyProvider, createMockClient } from 'cozy-client'
import I18n from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import enLocale from 'src/locales/en.json'

const AppLike = ({ children, client }) => (
  <CozyProvider client={client || createMockClient({})}>
    <I18n dictRequire={() => enLocale} lang={'en'}>
      <BreakpointsProvider>
        <StepperDialogProvider>
          <HashRouter>{children}</HashRouter>
        </StepperDialogProvider>
      </BreakpointsProvider>
    </I18n>
  </CozyProvider>
)

export default AppLike
