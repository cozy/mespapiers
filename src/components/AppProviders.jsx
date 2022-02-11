import React from 'react'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import { CozyProvider } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { PlaceholderModalProvider } from 'src/components/Contexts/PlaceholderModalProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const LocalProviders = ({ lang, children }) => {
  return (
    <ScannerI18nProvider lang={lang}>
      <PapersDefinitionsProvider>
        <StepperDialogProvider>
          <PlaceholderModalProvider>
            <ModalProvider>{children}</ModalProvider>
          </PlaceholderModalProvider>
        </StepperDialogProvider>
      </PapersDefinitionsProvider>
    </ScannerI18nProvider>
  )
}

export const AppProviders = ({ client, lang, polyglot, children }) => {
  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <MuiCozyTheme>
              <BreakpointsProvider>
                <LocalProviders lang={lang}>{children}</LocalProviders>
              </BreakpointsProvider>
            </MuiCozyTheme>
          </I18n>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}
