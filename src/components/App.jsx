/* global cozy */
import React, { useCallback, useMemo, useState } from 'react'
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
import Fab from 'cozy-ui/transpiled/react/Fab'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

import HomeWrapper from 'src/components/HomeWrapper/HomeWrapper'
import PapersList from 'src/components/Papers/PapersList'
import FileViewerWithQuery from 'src/components/Viewer/FileViewerWithQuery'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import PlaceholderThemesList from 'src/components/Placeholders/PlaceholderThemesList'

export const App = () => {
  const client = useClient()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar
  const [showPlaceholderThemesList, setShowPlaceholderThemesList] = useState(
    false
  )
  const hideAllPapersChoices = useCallback(
    () => setShowPlaceholderThemesList(false),
    []
  )
  const showAllPapersChoices = useCallback(
    () => setShowPlaceholderThemesList(true),
    []
  )
  const styleFab = useMemo(() => ({ position: 'fixed', zIndex: 10 }), [])

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

            <Fab
              color="primary"
              aria-label={t('Home.Fab.ariaLabel')}
              style={styleFab}
              className="u-bottom-m u-right-m"
              onClick={showAllPapersChoices}
            >
              <Icon icon={PlusIcon} />
            </Fab>
            {showPlaceholderThemesList && (
              <PlaceholderThemesList
                title={t('PlaceholdersList.title', { name: '' })}
                onClose={hideAllPapersChoices}
              />
            )}
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
