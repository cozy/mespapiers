import FileSharingProvider from 'components/Contexts/FileSharingProvider'
import { createHashHistory } from 'history'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ErrorProvider } from 'src/components/Contexts/ErrorProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { MultiSelectionProvider } from 'src/components/Contexts/MultiSelectionProvider'
import PapersCreatedProvider from 'src/components/Contexts/PapersCreatedProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'
import { PaywallProvider } from 'src/components/Contexts/PaywallProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import SearchProvider from 'src/components/Contexts/SearchProvider'
import { CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'
import enLocale from 'src/locales/en.json'

import { CozyProvider, createMockClient } from 'cozy-client'
import { WebviewIntentProvider } from 'cozy-intent'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'

jest.mock('cozy-client/dist/models/document/documentTypeData', () => ({
  themes: [{}]
}))

const mockClient = createMockClient({})
mockClient.plugins.realtime = {
  subscribe: jest.fn(),
  unsubscribe: jest.fn()
}

const WithHashRouter = ({ children, history, withoutHashRouter }) => {
  if (withoutHashRouter) {
    return children
  }
  const hashHistory = history || createHashHistory()
  return <HashRouter history={hashHistory}>{children}</HashRouter>
}

const AppLike = ({ children, client, history, withoutHashRouter }) => {
  return (
    <WithHashRouter withoutHashRouter={withoutHashRouter} history={history}>
      <WebviewIntentProvider>
        <FileSharingProvider>
          <CozyProvider client={client || mockClient}>
            <I18n dictRequire={() => enLocale} lang="en">
              <PapersCreatedProvider>
                <ErrorProvider>
                  <PaywallProvider>
                    <ScannerI18nProvider lang="en">
                      <SearchProvider
                        doctypes={[FILES_DOCTYPE, CONTACTS_DOCTYPE]}
                      >
                        <CozyTheme>
                          <BreakpointsProvider>
                            <AlertProvider>
                              <ModalProvider>
                                <MultiSelectionProvider>
                                  <PapersDefinitionsProvider>
                                    {children}
                                  </PapersDefinitionsProvider>
                                </MultiSelectionProvider>
                              </ModalProvider>
                            </AlertProvider>
                          </BreakpointsProvider>
                        </CozyTheme>
                      </SearchProvider>
                    </ScannerI18nProvider>
                  </PaywallProvider>
                </ErrorProvider>
              </PapersCreatedProvider>
            </I18n>
          </CozyProvider>
        </FileSharingProvider>
      </WebviewIntentProvider>
    </WithHashRouter>
  )
}

export default AppLike
