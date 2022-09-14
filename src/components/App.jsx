/* global cozy */

import React from 'react'
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom'

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
  return (
    <Routes>
      <Route path="/paper/*" element={<PaperView />} />
      <Route path="*" element={<Navigate to="/paper" replace />} />
    </Routes>
  )
}

export const App = () => {
  const { BarCenter } = cozy.bar
  const { isMobile } = useBreakpoints()
  const client = useClient()

  return (
    <HashRouter>
      <Layout monoColumn>
        <Main>
          <Content className="app-content">
            {isMobile && (
              <BarCenter>
                <MuiCozyTheme>
                  <Typography variant="h5">
                    {client.appMetadata.slug}
                  </Typography>
                </MuiCozyTheme>
              </BarCenter>
            )}
            <AppRouter />
          </Content>
        </Main>
        <IconSprite />
      </Layout>
    </HashRouter>
  )
}

export default App
