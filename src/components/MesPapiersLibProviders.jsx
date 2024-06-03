import PropTypes from 'prop-types'
import React from 'react'
import { ErrorProvider, useError } from 'src/components/Contexts/ErrorProvider'
import FileSharingProvider from 'src/components/Contexts/FileSharingProvider'
import { ModalProvider } from 'src/components/Contexts/ModalProvider'
import { MultiSelectionProvider } from 'src/components/Contexts/MultiSelectionProvider'
import PapersCreatedProvider from 'src/components/Contexts/PapersCreatedProvider'
import { PapersDefinitionsProvider } from 'src/components/Contexts/PapersDefinitionsProvider'
import { PaywallProvider } from 'src/components/Contexts/PaywallProvider'
import { ScannerI18nProvider } from 'src/components/Contexts/ScannerI18nProvider'
import SearchProvider from 'src/components/Contexts/SearchProvider'
import FabWrapper from 'src/components/FabWrapper'
import ForwardFab from 'src/components/ForwardFab/ForwardFab'
import { MesPapiersLibLayout } from 'src/components/MesPapiersLibLayout'
import PapersFab from 'src/components/PapersFab/PapersFab'
import PapersFabWrapper from 'src/components/PapersFab/PapersFabWrapper'
import { CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'

import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'

const MesPapiersLibProviders = () => {
  const { hasError } = useError()

  return (
    <PapersCreatedProvider>
      <AlertProvider>
        <PaywallProvider>
          <MultiSelectionProvider>
            <ScannerI18nProvider>
              <FileSharingProvider>
                <SearchProvider doctypes={[FILES_DOCTYPE, CONTACTS_DOCTYPE]}>
                  <PapersDefinitionsProvider>
                    <ModalProvider>
                      <MesPapiersLibLayout />
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
  )
}

const MesPapiersLibErrorProviders = () => {
  return (
    <ErrorProvider>
      <MesPapiersLibProviders />
    </ErrorProvider>
  )
}

export default MesPapiersLibErrorProviders

MesPapiersLibProviders.propTypes = {
  lang: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.func)
}
