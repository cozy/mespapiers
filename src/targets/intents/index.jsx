/* eslint-disable import/order */
import React from 'react'
import { render } from 'react-dom'
import {
  RouterProvider,
  createHashRouter,
  Outlet,
  Navigate
} from 'react-router-dom'

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-bar/dist/stylesheet.css'

import 'src/styles/index.styl'

import Intents from 'cozy-interapp'
import IntentProvider, {
  useIntent
} from 'cozy-ui/transpiled/react/providers/Intent'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'

import setupApp from 'src/targets/browser/setupApp'
import Intent from 'src/components/Views/Intent'
import { AppProviders } from 'src/components/AppProviders'
import ErrorBoundary from 'src/components/Views/ErrorBoundary'

console.info(' ')
console.info('## MesPapiers Intent Index')
console.info(' ')

const Redirect = () => {
  console.info('>> will navigate')

  const { data } = useIntent()

  console.info('data :', data)

  return <Navigate to={data.qualificationLabel} replace />
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
        element: <Redirect />
      },
      {
        path: ':qualificationLabel',
        element: <Intent />,
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

  render(<RouterProvider router={router} />, root)
})
