import { useContext } from 'react'
import ScannerI18nContext from 'components/Contexts/ScannerI18nProvider'

export const useScannerI18nContext = () => {
  const scannerT = useContext(ScannerI18nContext)
  if (!scannerT) {
    throw new Error(
      'ScannerI18nContext must be used within a ScannerI18nProvider'
    )
  }

  return scannerT
}
