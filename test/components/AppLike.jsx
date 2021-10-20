import React from 'react'
import { HashRouter } from 'react-router-dom'

import { CozyProvider, createMockClient } from 'cozy-client'
import I18n from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import enLocale from 'src/locales/en.json'

jest.mock('cozy-scanner/dist/locales', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))
jest.mock('cozy-scanner/dist/DocumentTypeData', () => ({
  themes: [{}]
}))

const AppLike = ({ children, client }) => (
  <CozyProvider client={client || createMockClient({})}>
    <I18n dictRequire={() => enLocale} lang={'en'}>
      <ScannerI18nProvider lang={'en'}>
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
