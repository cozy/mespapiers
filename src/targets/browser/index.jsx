/* eslint-disable import/order */
import React from 'react'
import { render } from 'react-dom'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-bar/dist/stylesheet.css'
import 'cozy-mespapiers-lib/dist/stylesheet.css'

import 'src/styles/index.styl'
import setupApp from 'src/targets/browser/setupApp'
import { register as registerServiceWorker } from 'src/targets/browser/serviceWorkerRegistration'
import { AppProviders } from 'src/components/AppProviders'
import App from 'src/components/App'

const init = () => {
  const { root, ...rest } = setupApp()
  render(
    <AppProviders {...rest}>
      <App />
    </AppProviders>,
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
