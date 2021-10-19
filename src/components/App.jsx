/* global cozy */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import { useClient, RealTimeQueries } from 'cozy-client'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'

import HomeWrapper from 'src/components/HomeWrapper/HomeWrapper'
import PapersList from 'src/components/Papers/PapersList'
import FileViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'

export const App = () => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { BarCenter, BarRight } = cozy.bar

  return (
    <HashRouter>
      <Layout monoColumn>
        {isMobile && (
          <>
            <BarCenter>
              <MuiCozyTheme>
                <Typography variant="h5">{client.appMetadata.slug}</Typography>
              </MuiCozyTheme>
            </BarCenter>
            <BarRight>
              <IconButton className={'u-pr-1'}>
                <Icon icon={DotsIcon} size={16} />
              </IconButton>
            </BarRight>
          </>
        )}
        <Main>
          <Content className="app-content">
            <Switch>
              <Route exact path="/" component={HomeWrapper} />
              <Route exact path="/files/:fileCategory" component={PapersList} />
              <Route
                exact
                path="/file/:fileId"
                component={FileViewerWithQuery}
              />
              <Redirect from="*" to="/" />
            </Switch>
          </Content>
          <RealTimeQueries doctype="io.cozy.files" />
          <Alerter />
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
