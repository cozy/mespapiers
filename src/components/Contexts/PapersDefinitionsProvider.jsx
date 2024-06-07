import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { buildPapersDefinitions } from 'src/helpers/buildPapersDefinitions'
import { fetchContentFileToJson } from 'src/helpers/fetchContentFileToJson'
import { fetchCustomPaperDefinitions } from 'src/helpers/fetchCustomPaperDefinitions'
import papersJSON_default from 'src/papersDefinitions.json'
import papersJSON_health from 'src/papersDefinitions_health.json'

import { useClient } from 'cozy-client'
import flag from 'cozy-flags'
import useFlag from 'cozy-flags/dist/useFlag'
import minilog from 'cozy-minilog'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const log = minilog('PapersDefinitionsProvider')

const PapersDefinitionsContext = createContext()

export const PapersDefinitionsProvider = ({ children }) => {
  const client = useClient()
  const { t } = useI18n()
  const scannerT = useScannerI18n()
  const { showAlert } = useAlert()
  const [customPapersDefinitions, setCustomPapersDefinitions] = useState({
    isLoaded: false,
    name: '',
    path: ''
  })

  const customPapersDefinitionsFlag = useFlag('customPapersDefinitions')
  const [papersDefinitions, setPapersDefinitions] = useState([])

  const isHealthThemeHidden = flag('hide.healthTheme.enabled')

  const papersJSON = useMemo(
    () =>
      isHealthThemeHidden
        ? papersJSON_default
        : {
            papersDefinitions: papersJSON_default.papersDefinitions.concat(
              papersJSON_health.papersDefinitions
            )
          },
    [isHealthThemeHidden]
  )

  useEffect(() => {
    ;(async () => {
      if (customPapersDefinitionsFlag) {
        const { paperConfigFilenameCustom, appFolderPath, file } =
          await fetchCustomPaperDefinitions(client, t)
        const data = await fetchContentFileToJson(client, file)

        if (data) {
          setCustomPapersDefinitions({
            isLoaded: true,
            name: paperConfigFilenameCustom,
            path: appFolderPath
          })
          setPapersDefinitions(
            buildPapersDefinitions(data.papersDefinitions, scannerT)
          )
          log.info('Custom PapersDefinitions loaded')
        } else {
          // If custom papersDefinitions.json not found, fallback on local file
          showAlert({
            message: t(
              `PapersDefinitionsProvider.customPapersDefinitions.error`,
              {
                name: paperConfigFilenameCustom,
                path: appFolderPath
              }
            ),
            severity: 'error',
            variant: 'filled'
          })
          setPapersDefinitions(
            buildPapersDefinitions(papersJSON.papersDefinitions, scannerT)
          )
          log.info('PapersDefinitions of the app loaded')
        }
      } else {
        // If has no custom papersDefinitions Flag
        setCustomPapersDefinitions({
          isLoaded: false,
          name: '',
          path: ''
        })

        setPapersDefinitions(
          buildPapersDefinitions(papersJSON.papersDefinitions, scannerT)
        )
        log.info('PapersDefinitions of the app loaded')
      }
    })()
  }, [
    client,
    customPapersDefinitionsFlag,
    scannerT,
    t,
    papersJSON.papersDefinitions,
    showAlert
  ])

  return (
    <PapersDefinitionsContext.Provider
      value={{
        papersDefinitions,
        customPapersDefinitions
      }}
    >
      {children}
    </PapersDefinitionsContext.Provider>
  )
}

export const usePapersDefinitions = () => {
  const papersDefinitionsContext = useContext(PapersDefinitionsContext)
  if (!papersDefinitionsContext) {
    throw new Error(
      'usePapersDefinitions must be used within a PapersDefinitionsProvider'
    )
  }
  return papersDefinitionsContext
}
