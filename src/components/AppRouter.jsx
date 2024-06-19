import React, { useEffect, useState } from 'react'
import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter
} from 'react-router-dom'
import { AppLayout } from 'src/components/AppLayout'
import { AppProviders } from 'src/components/AppProviders'
import {
  ForwardByRoute,
  forwardByRouteLoader
} from 'src/components/ForwardByRoute/ForwardByRoute'
import InstallAppFromIntent from 'src/components/InstallAppFromIntent/InstallAppFromIntent'
import InstallKonnectorFromIntent from 'src/components/InstallKonnectorFromIntent/InstallKonnectorFromIntent'
import ContactEdit from 'src/components/Views/ContactEdit'
import CreatePaperModalWrapper from 'src/components/Views/CreatePaperModal'
import EditWrapper from 'src/components/Views/Edit'
import ErrorBoundary from 'src/components/Views/ErrorBoundary'
import FilesViewerWithQuery from 'src/components/Views/FileViewerWithQuery'
import HarvestRoutes from 'src/components/Views/HarvestRoutes'
import Home from 'src/components/Views/Home'
import InformationEdit from 'src/components/Views/InformationEdit'
import MultiselectView from 'src/components/Views/MultiselectView'
import ConditionnalPapersList from 'src/components/Views/PapersList'
import PlaceholdersSelector from 'src/components/Views/PlaceholdersSelector'
import { makeClient } from 'src/targets/browser/makeClient'

import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent, WebviewIntentProvider } from 'cozy-intent'

const fileViewerRoutes = props => [
  {
    path: 'forward',
    element: <ForwardByRoute />,
    loader: routerProps => forwardByRouteLoader(routerProps, props)
  },
  {
    path: 'edit/information',
    element: <InformationEdit />
  },
  {
    path: 'edit/contact',
    element: <ContactEdit />
  }
]

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

const makeRoutes = props => [
  {
    element: (
      <AppProviders {...props}>
        <Outlet />
      </AppProviders>
    ),
    children: [
      {
        path: 'paper',
        element: <AppLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: '',
            element: <OutletWrapper Component={Home} />,
            children: [
              {
                path: 'editcontact/:fileId',
                element: <ContactEdit />
              },
              {
                path: 'installAppIntent',
                element: <InstallAppFromIntent />
              },
              {
                path: 'installKonnectorIntent',
                element: <InstallKonnectorFromIntent />
              },
              {
                path: 'create',
                element: <PlaceholdersSelector />
              },
              {
                path: 'create/:qualificationLabel',
                element: <CreatePaperModalWrapper />
              },
              {
                path: 'forward',
                element: <ForwardByRoute />,
                loader: routerProps => forwardByRouteLoader(routerProps, props)
              },
              {
                path: 'multiselect',
                element: <OutletWrapper Component={MultiselectView} />,
                children: [
                  {
                    path: 'forward',
                    element: <ForwardByRoute />,
                    loader: routerProps => {
                      return forwardByRouteLoader(routerProps, props)
                    }
                  },
                  {
                    path: 'view/:fileId',
                    element: <OutletWrapper Component={FilesViewerWithQuery} />,
                    children: fileViewerRoutes(props)
                  }
                ]
              }
            ]
          },
          {
            path: 'files/:qualificationLabel',
            element: <OutletWrapper Component={ConditionnalPapersList} />,
            children: [
              {
                path: 'forward',
                element: <ForwardByRoute />,
                loader: routerProps => forwardByRouteLoader(routerProps, props)
              },
              {
                path: 'editcontact/:fileId',
                element: <ContactEdit />
              },
              {
                path: 'installAppIntent',
                element: <InstallAppFromIntent />
              },
              {
                path: 'installKonnectorIntent',
                element: <InstallKonnectorFromIntent />
              },
              {
                path: 'create',
                element: <PlaceholdersSelector />
              },
              {
                path: 'create/:qualificationLabel',
                element: <CreatePaperModalWrapper />
              },
              {
                path: 'edit/:fileId',
                element: <EditWrapper />
              },
              {
                path: ':fileId',
                element: <OutletWrapper Component={FilesViewerWithQuery} />,
                children: fileViewerRoutes(props)
              },
              {
                path: 'harvest/:connectorSlug/*',
                element: <HarvestRoutes />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/paper" replace />
  }
]

export const AppRouter = props => {
  return (
    <WebviewIntentProvider>
      <AppSubRouter {...props} />
    </WebviewIntentProvider>
  )
}

export const AppSubRouter = props => {
  const webviewIntent = useWebviewIntent()
  const [client, setClient] = useState(undefined)

  useEffect(() => {
    if (isFlagshipApp() && !webviewIntent) return

    const client = makeClient(webviewIntent)

    setClient(client)
  }, [webviewIntent])

  if (!client) {
    return null
  }

  const propsWithClient = { ...props, client }

  const router = createHashRouter(makeRoutes(propsWithClient))

  return <RouterProvider router={router} />
}
