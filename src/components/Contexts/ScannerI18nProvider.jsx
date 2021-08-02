import React, { createContext } from 'react'

import { getBoundT } from 'cozy-scanner'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const ScannerI18nContext = createContext()

const ScannerI18nProvider = ({ children }) => {
  const { lang } = useI18n()
  const scannerT = getBoundT(lang)

  return (
    <ScannerI18nContext.Provider value={scannerT}>
      {children}
    </ScannerI18nContext.Provider>
  )
}

export default ScannerI18nContext

export { ScannerI18nProvider }
