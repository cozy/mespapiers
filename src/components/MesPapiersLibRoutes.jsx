import PropTypes from 'prop-types'
import React from 'react'
import {
  Routes,
  Route,
  useSearchParams,
  Navigate,
  useLocation,
  Outlet
} from 'react-router-dom'
import CreatePaperDataBackupRoute from 'src/components/CreatePaperDataBackupRoute'
import InstallAppFromIntent from 'src/components/InstallAppFromIntent/InstallAppFromIntent'
import InstallKonnectorFromIntent from 'src/components/InstallKonnectorFromIntent/InstallKonnectorFromIntent'
import MesPapiersLibProviders from 'src/components/MesPapiersLibProviders'
import ForwardModalByRoute from 'src/components/Multiselect/ForwardModalByRoute'
import ShareBottomSheetByRoute from 'src/components/Multiselect/ShareBottomSheetByRoute'
import ContactEdit from 'src/components/Views/ContactEdit'
import CreatePaperModal from 'src/components/Views/CreatePaperModal'
import ErrorBoundary from 'src/components/Views/ErrorBoundary'
import FilesViewerWithQuery from 'src/components/Views/FileViewerWithQuery'
import HarvestRoutes from 'src/components/Views/HarvestRoutes'
import Home from 'src/components/Views/Home'
import InformationEdit from 'src/components/Views/InformationEdit'
import MultiselectView from 'src/components/Views/MultiselectView'
import PageEdit from 'src/components/Views/PageEdit'
import PapersList from 'src/components/Views/PapersList'
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

const MesPapiersLibRoutes = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const konnectorSlug = searchParams.get('connectorSlug')

  // usefull when getting connectorSlug from Store after rerouting process
  // because of redirectAfterInstall
  if (konnectorSlug) {
    return <Navigate replace to={`${location.pathname}${konnectorSlug}`} />
  }

  return (
    <Routes>
      <Route element={<MesPapiersLibProviders />}>
        <Route errorElement={<ErrorBoundary />}>
          <Route element={<CreatePaperDataBackupRoute />}>
            <Route path="/" element={<OutletWrapper Component={Home} />}>
              <Route path="editcontact/:fileId" element={<ContactEdit />} />
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
                element={<CreatePaperModal />}
              />
              <Route
                path="multiselect"
                element={<OutletWrapper Component={MultiselectView} />}
              >
                <Route
                  path="forward/:fileId"
                  element={<ForwardModalByRoute />}
                />
                <Route path="share" element={<ShareBottomSheetByRoute />} />
                <Route
                  path="view/:fileId"
                  element={<OutletWrapper Component={FilesViewerWithQuery} />}
                >
                  {fileViewerRoutes.map(Component => Component)}
                </Route>
              </Route>
            </Route>
            <Route
              path="files/:qualificationLabel"
              element={<OutletWrapper Component={PapersList} />}
            >
              <Route path="forward/:fileId" element={<ForwardModalByRoute />} />
              <Route path="share" element={<ShareBottomSheetByRoute />} />
              <Route path="editcontact/:fileId" element={<ContactEdit />} />
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
                element={<CreatePaperModal />}
              />
              <Route
                path=":fileId"
                element={<OutletWrapper Component={FilesViewerWithQuery} />}
              >
                {fileViewerRoutes.map(Component => Component)}
              </Route>
              <Route
                path="harvest/:connectorSlug/*"
                element={<HarvestRoutes />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

MesPapiersLibRoutes.propTypes = {
  lang: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.func)
}

export default MesPapiersLibRoutes
