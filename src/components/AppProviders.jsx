import React, { useEffect } from 'react'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { launchMetadataMigrationJob } from 'src/helpers/migration/metadata'

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
  useEffect(() => {
    const launch = async () => {
      launchMetadataMigrationJob(client)
    }
    launch()
  }, [client])

  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <CozyTheme>
              <BreakpointsProvider>
                <BarProvider>{children}</BarProvider>
              </BreakpointsProvider>
            </CozyTheme>
          </I18n>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}
