import React, { useEffect } from 'react'
import { CreatePaperDataBackupProvider } from 'src/components/Contexts/CreatePaperDataBackupProvider'
import { ErrorProvider } from 'src/components/Contexts/ErrorProvider'
import FileSharingProvider from 'src/components/Contexts/FileSharingProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { MultiSelectionProvider } from 'src/components/Contexts/MultiSelectionProvider'
import PapersCreatedProvider from 'src/components/Contexts/PapersCreatedProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'
import { PaywallProvider } from 'src/components/Contexts/PaywallProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import SearchProvider from 'src/components/Contexts/SearchProvider'
import { CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'
import { launchMetadataMigrationJob } from 'src/helpers/migration/metadata'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const Providers = ({ client, lang, polyglot, children }) => {
  useEffect(() => {
    const launch = async () => {
      launchMetadataMigrationJob(client)
    }
    launch()
  }, [client])

  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <I18n lang={lang} polyglot={polyglot}>
            <CozyTheme>
              <BreakpointsProvider>
                <BarProvider>
                  <CreatePaperDataBackupProvider>
                    <PapersCreatedProvider>
                      <AlertProvider>
                        <PaywallProvider>
                          <MultiSelectionProvider>
                            <ScannerI18nProvider>
                              <FileSharingProvider>
                                <SearchProvider
                                  doctypes={[FILES_DOCTYPE, CONTACTS_DOCTYPE]}
                                >
                                  <PapersDefinitionsProvider>
                                    <ModalProvider>{children}</ModalProvider>
                                  </PapersDefinitionsProvider>
                                </SearchProvider>
                              </FileSharingProvider>
                            </ScannerI18nProvider>
                          </MultiSelectionProvider>
                        </PaywallProvider>
                      </AlertProvider>
                    </PapersCreatedProvider>
                  </CreatePaperDataBackupProvider>
                </BarProvider>
              </BreakpointsProvider>
            </CozyTheme>
          </I18n>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}
export const AppProviders = props => {
  return (
    <ErrorProvider>
      <Providers {...props} />
    </ErrorProvider>
  )
}
