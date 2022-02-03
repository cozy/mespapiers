/* global cozy */
import React from 'react'

import flag from 'cozy-flags'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient, RealTimeQueries } from 'cozy-client'

import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

export const AppLayout = ({ children }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const client = useClient()
  const { customPapersDefinitions } = usePapersDefinitions()
  const { BarCenter } = cozy.bar

  return (
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
              {t(`PapersDefinitionsProvider.customPapersDefinitions.warning`, {
                name: customPapersDefinitions.name
              })}
            </Typography>
          )}
          {children}
        </Content>

        <RealTimeQueries doctype="io.cozy.files" />
        <RealTimeQueries doctype="io.cozy.mespapiers.settings" />
        <Alerter t={t} />
        <ModalStack />
      </Main>
      <IconSprite />
    </Layout>
  )
}
