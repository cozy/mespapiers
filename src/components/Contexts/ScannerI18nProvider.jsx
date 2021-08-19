import React, { createContext } from 'react'

import { getBoundT } from 'cozy-scanner'

const ScannerI18nContext = createContext()

const ScannerI18nProvider = ({ lang, children }) => {
  const prefix = `Scan`
  const scannerI18n = getBoundT(lang)

  const scannerT = key => scannerI18n(`${prefix}.${key}`)

  return (
    <ScannerI18nContext.Provider value={scannerT}>
      {children}
    </ScannerI18nContext.Provider>
  )
}

export default ScannerI18nContext

export { ScannerI18nProvider }
