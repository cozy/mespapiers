import React from 'react'
import {
  Route,
  Navigate,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom'

import { BarComponent, BarCenter } from 'cozy-bar'
import { useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import MesPapiers from 'cozy-mespapiers-lib'
import flag from 'cozy-flags'

import Help from './Help'

const PaperView = props => {
  const { lang } = useI18n()

  return <MesPapiers {...props} lang={lang} />
}

const AppRouter = () => {
  const routes = (
    <Route element={<AppLayout />}>
      <Route path="/paper/*" element={<PaperView />} />
      <Route path="*" element={<Navigate to="/paper" replace />} />
    </Route>
  )
  const router = createHashRouter(createRoutesFromElements(routes))
  return <RouterProvider router={router} />
}

export const AppLayout = () => {
  const { isMobile } = useBreakpoints()
  const client = useClient()

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
          <Outlet />
        </Content>
      </Main>
      <IconSprite />
    </Layout>
  )
}

export default AppRouter
