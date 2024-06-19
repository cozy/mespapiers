import React, { useEffect, useState } from 'react'
import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter
} from 'react-router-dom'
import { AppLayout } from 'src/components/AppLayout'
import { AppProviders } from 'src/components/AppProviders'
import InstallAppFromIntent from 'src/components/InstallAppFromIntent/InstallAppFromIntent'
import InstallKonnectorFromIntent from 'src/components/InstallKonnectorFromIntent/InstallKonnectorFromIntent'
import ForwardModalByRoute from 'src/components/Multiselect/ForwardModalByRoute'
import ShareBottomSheetByRoute from 'src/components/Multiselect/ShareBottomSheetByRoute'
import ContactEdit from 'src/components/Views/ContactEdit'
import CreatePaperModalWrapper from 'src/components/Views/CreatePaperModal'
import ErrorBoundary from 'src/components/Views/ErrorBoundary'
import FilesViewerWithQuery from 'src/components/Views/FileViewerWithQuery'
import HarvestRoutes from 'src/components/Views/HarvestRoutes'
import Home from 'src/components/Views/Home'
import InformationEdit from 'src/components/Views/InformationEdit'
import MultiselectView from 'src/components/Views/MultiselectView'
import PageEdit from 'src/components/Views/PageEdit'
import ConditionnalPapersList from 'src/components/Views/PapersList'
import PlaceholdersSelector from 'src/components/Views/PlaceholdersSelector'
import { useWebviewIntent, WebviewIntentProvider } from 'cozy-intent'
import { isFlagshipApp } from 'cozy-device-helper'
import { makeClient } from 'src/targets/browser/makeClient'

const fileViewerRoutes = [
  {
    path: 'forward/:fileId',
    element: <ForwardModalByRoute />
  },
  {
    path: 'share',
    element: <ShareBottomSheetByRoute />
  },
  {
    path: 'edit/information',
    element: <InformationEdit />
  },
  {
    path: 'edit/page',
    element: <PageEdit />
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
    path: 'paper',
    element: (
      <AppProviders {...props}>
        <AppLayout />
      </AppProviders>
    ),
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
            path: 'forward/:fileId',
            element: <ForwardModalByRoute />
          },
          {
            path: 'multiselect',
            element: <OutletWrapper Component={MultiselectView} />,
            children: [
              {
                path: 'forward/:fileId',
                element: <ForwardModalByRoute />
              },
              {
                path: 'share',
                element: <ShareBottomSheetByRoute />
              },
              {
                path: 'view/:fileId',
                element: <OutletWrapper Component={FilesViewerWithQuery} />,
                children: fileViewerRoutes
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
            path: 'forward/:fileId',
            element: <ForwardModalByRoute />
          },
          {
            path: 'share',
            element: <ShareBottomSheetByRoute />
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
            path: ':fileId',
            element: <OutletWrapper Component={FilesViewerWithQuery} />,
            children: fileViewerRoutes
          },
          {
            path: 'harvest/:connectorSlug/*',
            element: <HarvestRoutes />
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
  console.log('🌈 AppRouter')
  return (
    <WebviewIntentProvider>
      <AppSubRouter {...props} />
    </WebviewIntentProvider>
  )
}

export const AppSubRouter = props => {
  console.log('🌈 AppSubRouter')
  const webviewIntent = useWebviewIntent()
  const [client, setClient] = useState(undefined)

  useEffect(() => {
    console.log('🌈 AppSubRouter useEffect')
    console.log('🟢 webviewIntent', webviewIntent)
    if (isFlagshipApp() && !webviewIntent) return

    const client = makeClient(webviewIntent)

    setClient(client)
  }, [webviewIntent])

  if (!client) {
    console.log('🌈 AppSubRouter !client')
    return null
  }
  console.log('🌈 AppSubRouter client')

  const propsWithClient = { ...props, client }

  const router = createHashRouter(makeRoutes(propsWithClient))
  return <RouterProvider router={router} />
}
