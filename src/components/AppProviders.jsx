import React, { useEffect } from 'react'
import { ErrorProvider, useError } from 'src/components/Contexts/ErrorProvider'
import FileSharingProvider from 'src/components/Contexts/FileSharingProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { MultiSelectionProvider } from 'src/components/Contexts/MultiSelectionProvider'
import PapersCreatedProvider from 'src/components/Contexts/PapersCreatedProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'
import { PaywallProvider } from 'src/components/Contexts/PaywallProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import FabWrapper from 'src/components/FabWrapper'
import ForwardFab from 'src/components/ForwardFab/ForwardFab'
import PapersFab from 'src/components/PapersFab/PapersFab'
import PapersFabWrapper from 'src/components/PapersFab/PapersFabWrapper'
import SearchProvider from 'src/components/Search/SearchProvider'
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
  const { hasError } = useError()

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
                                  <ModalProvider>
                                    {children}
                                    {!hasError && (
                                      <FabWrapper>
                                        <ForwardFab />
                                        <PapersFabWrapper>
                                          <PapersFab />
                                        </PapersFabWrapper>
                                      </FabWrapper>
                                    )}
                                  </ModalProvider>
                                </PapersDefinitionsProvider>
                              </SearchProvider>
                            </FileSharingProvider>
                          </ScannerI18nProvider>
                        </MultiSelectionProvider>
                      </PaywallProvider>
                    </AlertProvider>
                  </PapersCreatedProvider>
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
