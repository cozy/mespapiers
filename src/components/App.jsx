/* global cozy */

import React from 'react'
import {
  Route,
  Navigate,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  Outlet
} from 'react-router-dom'

import { useClient } from 'cozy-client'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import MesPapiers from 'cozy-mespapiers-lib'

const PaperView = props => {
  const { lang } = useI18n()

  return <MesPapiers {...props} lang={lang} />
}

const AppRouter = () => {
  const routes = (
    <Route path="/" element={<AppLayout />}>
      <Route path="/paper/*" element={<PaperView />} />
      <Route path="*" element={<Navigate to="/paper" replace />} />
    </Route>
  )
  const router = createHashRouter(createRoutesFromElements(routes))
  return <RouterProvider router={router} />
}

export const AppLayout = () => {
  const { BarCenter } = cozy.bar
  const { isMobile } = useBreakpoints()
  const client = useClient()

  return (
    <Layout monoColumn>
      <Main>
        <Content className="app-content">
          {isMobile && (
            <BarCenter>
              <MuiCozyTheme>
                <Typography variant="h5">{client.appMetadata.slug}</Typography>
              </MuiCozyTheme>
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
