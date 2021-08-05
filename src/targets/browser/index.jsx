import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import '../../styles/index.styl'

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
          <MuiCozyTheme>
            <BreakpointsProvider>
              <StepperDialogProvider>
                <App />
              </StepperDialogProvider>
            </BreakpointsProvider>
          </MuiCozyTheme>
        </I18n>
      </CozyProvider>
    </StylesProvider>,
    root
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
