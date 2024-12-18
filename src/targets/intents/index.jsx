/* eslint-disable import/order */
import React from 'react'
import {
  RouterProvider,
  createHashRouter,
  Outlet,
  Navigate
} from 'react-router-dom'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-viewer/dist/stylesheet.css'
import 'cozy-bar/dist/stylesheet.css'

import 'src/styles/index.styl'

import Intents from 'cozy-interapp'
import IntentProvider, {
  useIntent
} from 'cozy-ui/transpiled/react/providers/Intent'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'

import setupApp from 'src/targets/browser/setupApp'
import { EditLoader } from 'src/components/Views/Edit'
import { AppProviders } from 'src/components/AppProviders'
import ErrorBoundary from 'src/components/Views/ErrorBoundary'
import ContactEdit from 'src/components/Views/ContactEdit'
import InformationEdit from 'src/components/Views/InformationEdit'

export const IntentWrapper = ({ Component }) => {
  const { service } = useIntent()

  return <Component onClose={service.cancel} onSubmit={service.terminate} />
}

const IntentLoader = () => {
  const { data } = useIntent()

  return <Navigate to={data.path} replace />
}

const makeRoutes = ({ client, intentId, ...rest }) => [
  {
    element: (
      <AppProviders client={client} {...rest}>
        <IntentProvider
          intentId={intentId}
          componentsProps={{ spinner: { color: 'white' } }}
        >
          <Outlet />
          <IconSprite />
        </IntentProvider>
      </AppProviders>
    ),
    children: [
      {
        path: '/',
        element: <IntentLoader />
      },
      {
        path: ':qualificationLabel/:fileId',
        element: <IntentWrapper Component={EditLoader} />,
        errorElement: <ErrorBoundary />
      },
      {
        path: ':qualificationLabel/:fileId/edit/information',
        element: <IntentWrapper Component={InformationEdit} />,
        errorElement: <ErrorBoundary />
      },
      {
        path: ':qualificationLabel/:fileId/edit/contact',
        element: <IntentWrapper Component={ContactEdit} />,
        errorElement: <ErrorBoundary />
      }
    ]
  }
]

document.addEventListener('DOMContentLoaded', () => {
  const { root, client, ...rest } = setupApp()

  const intents = new Intents({ client })
  client.intents = intents

  const intentId = new URLSearchParams(window.location.search).get('intent')
  const router = createHashRouter(makeRoutes({ client, intentId, ...rest }))

  root.render(<RouterProvider router={router} />)
})
