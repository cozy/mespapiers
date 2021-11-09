import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import '../../styles/index.styl'
// import '../../utils/wdyr'
import React from 'react'
import { render } from 'react-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import setupApp from 'src/targets/browser/setupApp'
import App from 'src/components/App'
import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { PlaceholderModalProvider } from 'src/components/Contexts/PlaceholderModalProvider'
import { register as registerServiceWorker } from 'src/targets/browser/serviceWorkerRegistration'

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

const init = () => {
  const { root, client, lang, polyglot } = setupApp()
  render(
    <StylesProvider generateClassName={generateClassName}>
      <CozyProvider client={client}>
        <I18n lang={lang} polyglot={polyglot}>
          <ScannerI18nProvider lang={lang}>
            <MuiCozyTheme>
              <BreakpointsProvider>
                <StepperDialogProvider>
                  <PlaceholderModalProvider>
                    <ModalProvider>
                      <App />
                    </ModalProvider>
                  </PlaceholderModalProvider>
                </StepperDialogProvider>
              </BreakpointsProvider>
            </MuiCozyTheme>
          </ScannerI18nProvider>
        </I18n>
      </CozyProvider>
    </StylesProvider>,
    root
  )
}

registerServiceWorker()

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
