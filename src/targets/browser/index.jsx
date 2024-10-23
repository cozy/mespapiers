/* eslint-disable import/order */
import React from 'react'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-viewer/dist/stylesheet.css'
import 'cozy-bar/dist/stylesheet.css'

import 'src/styles/index.styl'
import setupApp from 'src/targets/browser/setupApp'
import { register as registerServiceWorker } from 'src/targets/browser/serviceWorkerRegistration'
import { AppRouter } from 'src/components/AppRouter'

const init = () => {
  const { root, ...rest } = setupApp()

  root.render(<AppRouter {...rest} />)
}

registerServiceWorker()

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
