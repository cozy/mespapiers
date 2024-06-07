import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import enLocale from 'src/locales/en.json'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const useThemeLabel = label => {
  const scannerT = useScannerI18n()
  const { t } = useI18n()

  const hasLocale = enLocale?.Scan?.themes?.[label]

  return hasLocale ? t(`Scan.themes.${label}`) : scannerT(`themes.${label}`)
}
