import React from 'react'
import { Route, Navigate, Outlet, HashRouter, Routes } from 'react-router-dom'
import { AppLayout } from 'src/components/App'
import { AppProviders } from 'src/components/AppProviders'
import CreatePaperDataBackupRoute from 'src/components/CreatePaperDataBackupRoute'
import { AppFabs } from 'src/components/Fabs'
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

const fileViewerRoutes = [
  <Route key="01" path="forward/:fileId" element={<ForwardModalByRoute />} />,
  <Route key="02" path="share" element={<ShareBottomSheetByRoute />} />,
  <Route key="03" path="edit/information" element={<InformationEdit />} />,
  <Route key="04" path="edit/page" element={<PageEdit />} />,
  <Route key="05" path="edit/contact" element={<ContactEdit />} />
]

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

export const AppRouter = props => {
  return (
    <HashRouter>
      <AppProviders {...props}>
        <Routes>
          <Route errorElement={<ErrorBoundary />}>
            <Route element={<AppFabs />}>
              <Route element={<CreatePaperDataBackupRoute />}>
                <Route element={<AppLayout />} errorElement={<ErrorBoundary />}>
                  <Route path="/" element={<OutletWrapper Component={Home} />}>
                    <Route
                      path="editcontact/:fileId"
                      element={<ContactEdit />}
                    />
                    <Route
                      path="installAppIntent"
                      element={<InstallAppFromIntent />}
                    />
                    <Route
                      path="installKonnectorIntent"
                      element={<InstallKonnectorFromIntent />}
                    />
                    <Route path="create" element={<PlaceholdersSelector />} />
                    <Route
                      path="create/:qualificationLabel"
                      element={<CreatePaperModalWrapper />}
                    />
                    <Route
                      path="multiselect"
                      element={<OutletWrapper Component={MultiselectView} />}
                    >
                      <Route
                        path="forward/:fileId"
                        element={<ForwardModalByRoute />}
                      />
                      <Route
                        path="share"
                        element={<ShareBottomSheetByRoute />}
                      />
                      <Route
                        path="view/:fileId"
                        element={
                          <OutletWrapper Component={FilesViewerWithQuery} />
                        }
                      >
                        {fileViewerRoutes.map(Component => Component)}
                      </Route>
                    </Route>
                  </Route>
                  <Route
                    path="files/:qualificationLabel"
                    element={
                      <OutletWrapper Component={ConditionnalPapersList} />
                    }
                  >
                    <Route
                      path="forward/:fileId"
                      element={<ForwardModalByRoute />}
                    />
                    <Route path="share" element={<ShareBottomSheetByRoute />} />
                    <Route
                      path="editcontact/:fileId"
                      element={<ContactEdit />}
                    />
                    <Route
                      path="installAppIntent"
                      element={<InstallAppFromIntent />}
                    />
                    <Route
                      path="installKonnectorIntent"
                      element={<InstallKonnectorFromIntent />}
                    />
                    <Route path="create" element={<PlaceholdersSelector />} />
                    <Route
                      path="create/:qualificationLabel"
                      element={<CreatePaperModalWrapper />}
                    />
                    <Route
                      path=":fileId"
                      element={
                        <OutletWrapper Component={FilesViewerWithQuery} />
                      }
                    >
                      {fileViewerRoutes.map(Component => Component)}
                    </Route>
                    <Route
                      path="harvest/:connectorSlug/*"
                      element={<HarvestRoutes />}
                    />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AppProviders>
    </HashRouter>
  )
}
