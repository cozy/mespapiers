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

export const AppProviders = ({ client, lang, polyglot, children }) => {
  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <MuiCozyTheme>
              <BreakpointsProvider>{children}</BreakpointsProvider>
            </MuiCozyTheme>
          </I18n>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}
