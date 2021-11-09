/* global cozy */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import { useClient, RealTimeQueries } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import HomeWrapper from 'src/components/HomeWrapper/HomeWrapper'
import PapersList from 'src/components/Papers/PapersList'
import FileViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'
import Onboarding from 'src/components/Onboarding/Onboarding'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import StepperDialogWrapper from 'src/components/StepperDialogWrapper/StepperDialogWrapper'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'

export const App = () => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  const { isStepperDialogOpen } = useStepperDialog()

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
          </>
        )}
        <Main>
          <Content className="app-content">
            <>
              <Switch>
                <Route exact path="/" component={HomeWrapper} />
                <Route
                  exact
                  path="/files/:fileCategory"
                  component={PapersList}
                />
                <Route
                  exact
                  path="/file/:fileId"
                  component={FileViewerWithQuery}
                />
                <Route exact path="/onboarding" component={Onboarding} />
                <Redirect from="*" to="/" />
              </Switch>

              {isStepperDialogOpen && (
                <FormDataProvider>
                  <StepperDialogWrapper />
                </FormDataProvider>
              )}
            </>
          </Content>
          <RealTimeQueries doctype="io.cozy.files" />
          <Alerter t={t} />
          <ModalStack />
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
