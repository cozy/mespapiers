import React from 'react'
import { HashRouter } from 'react-router-dom'

import { CozyProvider, createMockClient } from 'cozy-client'
import I18n from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { StepperDialogProvider } from 'components/Contexts/StepperDialogProvider'
import { ScannerI18nProvider } from 'components/Contexts/ScannerI18nProvider'
import enLocale from 'root/locales/en.json'

const AppLike = ({ children, client }) => (
  <CozyProvider client={client || createMockClient({})}>
    <I18n dictRequire={() => enLocale} lang={'en'}>
      <ScannerI18nProvider>
        <BreakpointsProvider>
          <StepperDialogProvider>
            <HashRouter>{children}</HashRouter>
          </StepperDialogProvider>
        </BreakpointsProvider>
      </ScannerI18nProvider>
    </I18n>
  </CozyProvider>
)

export default AppLike
