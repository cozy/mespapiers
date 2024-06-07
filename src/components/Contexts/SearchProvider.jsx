import React from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import SearchProvider from 'src/components/Search/SearchProvider'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const SearchProviderWithT = props => {
  const scannerT = useScannerI18n()
  const { t } = useI18n()

  return <SearchProvider t={t} scannerT={scannerT} {...props} />
}

export default SearchProviderWithT
