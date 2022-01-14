/* global cozy */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Redirect, HashRouter } from 'react-router-dom'

import flag from 'cozy-flags'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import {
  isQueryLoading,
  useClient,
  useQuery,
  RealTimeQueries
} from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import Home from 'src/components/Home/Home'
import PapersListWrapper from 'src/components/Papers/PapersListWrapper'
import FileViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'
import Onboarding from 'src/components/Onboarding/Onboarding'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import StepperDialogWrapper from 'src/components/StepperDialogWrapper/StepperDialogWrapper'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import {
  OnboardedGuardedRoute,
  OnboardingGuardedRoute
} from 'src/components/Router'

import { getOnboardingStatus } from 'src/helpers/queries'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

export const App = () => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  const { isStepperDialogOpen } = useStepperDialog()
  const { papersDefinitions, customPapersDefinitions } = usePapersDefinitions()

  const { data: settingsData, ...settingsQuery } = useQuery(
    getOnboardingStatus.definition,
    getOnboardingStatus.options
  )

  return (
    <HashRouter>
      <Layout monoColumn>
        {flag('switcher') && <FlagSwitcher />}
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
            {customPapersDefinitions.isLoaded && (
              <Typography variant="subtitle2" align="center" color="secondary">
                {t(
                  `PapersDefinitionsProvider.customPapersDefinitions.warning`,
                  {
                    name: customPapersDefinitions.name
                  }
                )}
              </Typography>
            )}
            {isQueryLoading(settingsQuery) || papersDefinitions.length === 0 ? (
              <Spinner
                size="xxlarge"
                className="u-flex u-flex-justify-center u-mt-2 u-h-5"
              />
            ) : (
              <>
                <Switch>
                  <OnboardedGuardedRoute
                    exact
                    path="/"
                    component={Home}
                    settingsData={settingsData}
                  />
                  <OnboardedGuardedRoute
                    exact
                    path="/files/:fileCategory"
                    component={PapersListWrapper}
                    settingsData={settingsData}
                  />
                  <OnboardedGuardedRoute
                    exact
                    path="/file/:fileId"
                    component={FileViewerWithQuery}
                    settingsData={settingsData}
                  />
                  <OnboardingGuardedRoute
                    exact
                    path="/onboarding"
                    component={Onboarding}
                    settingsData={settingsData}
                  />

                  <Redirect from="*" to="/" />
                </Switch>
                {isStepperDialogOpen && (
                  <FormDataProvider>
                    <StepperDialogWrapper />
                  </FormDataProvider>
                )}
              </>
            )}
          </Content>
          <RealTimeQueries doctype="io.cozy.files" />
          <RealTimeQueries doctype="io.cozy.mespapiers.settings" />
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
