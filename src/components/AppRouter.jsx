import React from 'react'
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
import ConditionnalPapersList from 'src/components/Views/PapersList'
import PlaceholdersSelector from 'src/components/Views/PlaceholdersSelector'

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
  const router = createHashRouter(makeRoutes(props))
  return <RouterProvider router={router} />
}
