import React from 'react'
import { Outlet } from 'react-router-dom'
import { ModalStack } from 'src/components/Contexts/ModalProvider'
import { usePaywall } from 'src/components/Contexts/PaywallProvider'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import PapersPaywall from 'src/components/PapersPaywall/PapersPaywall'
import {
  CONTACTS_DOCTYPE,
  FILES_DOCTYPE,
  SETTINGS_DOCTYPE,
  TRIGGERS_DOCTYPE
} from 'src/constants'

import { RealTimeQueries } from 'cozy-client'
import CozyDevTools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const MesPapiersLibLayout = () => {
  const { t } = useI18n()
  const { customPapersDefinitions, papersDefinitions } = usePapersDefinitions()
  const { showPaywall, setShowPaywall } = usePaywall()

  const onClosePaywall = () => {
    setShowPaywall(false)
  }

  return (
    <>
      {flag('debug') && <CozyDevTools />}

      {customPapersDefinitions.isLoaded && (
        <Typography variant="subtitle2" align="center" color="error">
          {t(`PapersDefinitionsProvider.customPapersDefinitions.warning`, {
            name: customPapersDefinitions.name
          })}
        </Typography>
      )}
      {papersDefinitions.length === 0 ? (
        <Spinner
          size="xxlarge"
          className="u-flex u-flex-justify-center u-mt-2 u-h-5"
        />
      ) : (
        <Outlet />
      )}
      <RealTimeQueries doctype={FILES_DOCTYPE} />
      <RealTimeQueries doctype={CONTACTS_DOCTYPE} />
      <RealTimeQueries doctype={TRIGGERS_DOCTYPE} />
      <RealTimeQueries doctype={SETTINGS_DOCTYPE} />
      <ModalStack />
      {showPaywall && <PapersPaywall onClose={onClosePaywall} />}
    </>
  )
}
