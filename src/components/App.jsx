import React from 'react'
import { Route, Navigate, Outlet, HashRouter, Routes } from 'react-router-dom'
import { AppProviders } from 'src/components/AppProviders'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { usePaywall } from 'src/components/Contexts/PaywallProvider'
import Help from 'src/components/Help'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import MesPapiersLibRoutes from 'src/components/MesPapiersLibRoutes'
import PapersPaywall from 'src/components/PapersPaywall/PapersPaywall'
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

const AppRouter = props => {
  return (
    <HashRouter>
      <AppProviders {...props}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/paper/*" element={<MesPapiersLibRoutes />} />
            <Route path="*" element={<Navigate to="/paper" replace />} />
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
