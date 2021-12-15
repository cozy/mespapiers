import React, { createContext, useEffect, useState } from 'react'

import useFlag from 'cozy-flags/dist/useFlag'
import log from 'cozy-logger'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import papersJSON from 'src/constants/papersDefinitions.json'
import { fetchCustomPaperDefinitions } from 'src/utils/fetchCustomPaperDefinitions'
import { fetchContentFileToJson } from 'src/utils/fetchContentFileToJson'

const PapersDefinitionsContext = createContext()

const PapersDefinitionsProvider = ({ children }) => {
  const client = useClient()
  const { t } = useI18n()
  const [customPapersDefinitions, setCustomPapersDefinitions] = useState({
    isLoaded: false,
    name: '',
    path: ''
  })

  const customPapersDefinitionsFlag = useFlag('customPapersDefinitions')
  const [papersDefinitions, setPapersDefinitions] = useState([])

  useEffect(() => {
    ;(async () => {
      if (customPapersDefinitionsFlag) {
        const {
          paperConfigFilenameCustom,
          appFolderPath,
          file
        } = await fetchCustomPaperDefinitions(client, t)
        const data = await fetchContentFileToJson(client, file)

        if (data) {
          setCustomPapersDefinitions({
            isLoaded: true,
            name: paperConfigFilenameCustom,
            path: appFolderPath
          })
          setPapersDefinitions(data.papersDefinitions)
          log('info', 'Custom PapersDefinitions loaded')
        } else {
          // If custom papersDefinitions.json not found, fallback on local file
          Alerter.error(
            t(`PapersDefinitionsProvider.customPapersDefinitions.error`, {
              name: paperConfigFilenameCustom,
              path: appFolderPath
            }),
            {
              buttonText: 'Ok',
              buttonAction: dismiss => dismiss(),
              duration: 20000
            }
          )
          setPapersDefinitions(papersJSON.papersDefinitions)
          log('info', 'PapersDefinitions of the app loaded')
        }
      } else {
        // If has no custom papersDefinitions Flag
        setCustomPapersDefinitions({
          isLoaded: false,
          name: '',
          path: ''
        })
        setPapersDefinitions(papersJSON.papersDefinitions)
        log('info', 'PapersDefinitions of the app loaded')
      }
    })()
  }, [client, customPapersDefinitionsFlag, t])

  return (
    <PapersDefinitionsContext.Provider
      value={{
        papersDefinitions,
        setPapersDefinitions,
        customPapersDefinitions
      }}
    >
      {children}
    </PapersDefinitionsContext.Provider>
  )
}

export default PapersDefinitionsContext

export { PapersDefinitionsProvider }
