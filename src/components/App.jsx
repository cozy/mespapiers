/* global cozy */

import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

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

  // FIX The "multiSelectionFiles" in "MultiSelectionProvider" state is reset when you return to the selection screen (see cozy-mespapiers-lib)
  return <MesPapiers {...props} lang={lang} />
}

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/paper" component={PaperView} />
      <Redirect from="*" to="/paper" />
    </Switch>
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

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
