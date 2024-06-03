import React from 'react'
import { Route, Navigate, Outlet, HashRouter, Routes } from 'react-router-dom'
import { AppProviders } from 'src/components/AppProviders'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { usePaywall } from 'src/components/Contexts/PaywallProvider'
import CreatePaperDataBackupRoute from 'src/components/CreatePaperDataBackupRoute'
import { AppFabs } from 'src/components/Fabs'
import Help from 'src/components/Help'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import InstallAppFromIntent from 'src/components/InstallAppFromIntent/InstallAppFromIntent'
import InstallKonnectorFromIntent from 'src/components/InstallKonnectorFromIntent/InstallKonnectorFromIntent'
import ForwardModalByRoute from 'src/components/Multiselect/ForwardModalByRoute'
import ShareBottomSheetByRoute from 'src/components/Multiselect/ShareBottomSheetByRoute'
import PapersPaywall from 'src/components/PapersPaywall/PapersPaywall'
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
import {
  CONTACTS_DOCTYPE,
  FILES_DOCTYPE,
  SETTINGS_DOCTYPE,
  TRIGGERS_DOCTYPE
} from 'src/constants'

import { BarComponent, BarCenter } from 'cozy-bar'
import { RealTimeQueries } from 'cozy-client'
import { useClient } from 'cozy-client'
import CozyDevTools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

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

const AppRouter = props => {
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

export const AppLayout = () => {
  const { isMobile } = useBreakpoints()
  const client = useClient()
  const { t } = useI18n()
  const { customPapersDefinitions, papersDefinitions } = usePapersDefinitions()
  const { showPaywall, setShowPaywall } = usePaywall()

  const onClosePaywall = () => {
    setShowPaywall(false)
  }

  return (
    <Layout monoColumn>
      <BarComponent />
      <Main>
        <Content className="app-content">
          {flag('mespapiers.show-help.enabled') && <Help />}
          {isMobile && (
            <BarCenter>
              <Typography variant="h5">{client.appMetadata.slug}</Typography>
            </BarCenter>
          )}
          <>
            {flag('debug') && <CozyDevTools />}

            {customPapersDefinitions.isLoaded && (
              <Typography variant="subtitle2" align="center" color="error">
                {t(
                  `PapersDefinitionsProvider.customPapersDefinitions.warning`,
                  {
                    name: customPapersDefinitions.name
                  }
                )}
              </Typography>
            )}
            {papersDefinitions.length === 0 ? (
              <Spinner
                size="xxlarge"
                className="u-flex u-flex-justify-center u-mt-2 u-h-5"
              />
            ) : (
              <Outlet />
            )}
            <RealTimeQueries doctype={FILES_DOCTYPE} />
            <RealTimeQueries doctype={CONTACTS_DOCTYPE} />
            <RealTimeQueries doctype={TRIGGERS_DOCTYPE} />
            <RealTimeQueries doctype={SETTINGS_DOCTYPE} />
            <ModalStack />
            {showPaywall && <PapersPaywall onClose={onClosePaywall} />}
          </>
        </Content>
      </Main>
      <IconSprite />
    </Layout>
  )
}

export default AppRouter
