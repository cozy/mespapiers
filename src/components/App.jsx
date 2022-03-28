/* global cozy */

import React from 'react'
import { hot } from 'react-hot-loader'

import { useClient } from 'cozy-client'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'

import MesPapiersLib from 'src/indexLib'

export const App = () => {
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
          <MesPapiersLib />
        </Content>
      </Main>
      <IconSprite />
    </Layout>
  )
}

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
