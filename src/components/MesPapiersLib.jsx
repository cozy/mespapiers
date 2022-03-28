import React from 'react'

import { RealTimeQueries } from 'cozy-client'
import flag from 'cozy-flags'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import {
  ModalProvider,
  ModalStack
} from 'src/components/Contexts/ModalProvider'
import { PlaceholderModalProvider } from 'src/components/Contexts/PlaceholderModalProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { AppRouter } from 'src/components/AppRouter'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'

const App = () => {
  const { t } = useI18n()
  const { customPapersDefinitions, papersDefinitions } = usePapersDefinitions()

  const { isStepperDialogOpen } = useStepperDialog()

  return (
    <>
      {flag('switcher') && <FlagSwitcher />}

      {customPapersDefinitions.isLoaded && (
        <Typography variant="subtitle2" align="center" color="secondary">
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
        <AppRouter />
      )}
      {isStepperDialogOpen && (
        <FormDataProvider>
          <StepperDialogWrapper />
        </FormDataProvider>
      )}
      <RealTimeQueries doctype="io.cozy.files" />
      <RealTimeQueries doctype="io.cozy.mespapiers.settings" />
      <Alerter t={t} />
      <ModalStack />
    </>
  )
}

const MesPapiersLib = () => {
  // TODO: A mettre dans ScannerI18nProvider
  const { lang } = useI18n()

  return (
    <ScannerI18nProvider lang={lang}>
      <PapersDefinitionsProvider>
        <StepperDialogProvider>
          <PlaceholderModalProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </PlaceholderModalProvider>
        </StepperDialogProvider>
      </PapersDefinitionsProvider>
    </ScannerI18nProvider>
  )
}

export default MesPapiersLib
