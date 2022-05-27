import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import '../../styles/index.styl'
// import '../../utils/wdyr'
import React from 'react'
import { createRoot } from 'react-dom/client'

import setupApp from 'src/targets/browser/setupApp'
import { register as registerServiceWorker } from 'src/targets/browser/serviceWorkerRegistration'
import { AppProviders } from 'src/components/AppProviders'
import App from 'src/components/App'

const init = () => {
  const { container, ...rest } = setupApp()
  const root = createRoot(container)
  root.render(
    <AppProviders {...rest}>
      <App />
    </AppProviders>
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
