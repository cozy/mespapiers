/* global cozy */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import { useClient } from 'cozy-client'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { HomeWrapper } from 'components/HomeWrapper'

export const App = () => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  return (
    <HashRouter>
      <Layout monoColumn>
        {isMobile && (
          <BarCenter>
            <MuiCozyTheme>
              <Typography variant="h5">{client.appMetadata.slug}</Typography>
            </MuiCozyTheme>
          </BarCenter>
        )}
        <Main>
          <Content className="app-content">
            <Switch>
              <Route path="/" component={HomeWrapper} />
              <Redirect from="*" to="/" />
            </Switch>
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
