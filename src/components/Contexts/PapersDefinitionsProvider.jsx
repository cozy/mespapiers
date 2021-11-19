import React, { createContext, useEffect, useState } from 'react'

import useFlag from 'cozy-flags/dist/useFlag'
import log from 'cozy-logger'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import papersJSON from 'src/constants/papersDefinitions.json'
import { fetchJsonFileByName } from 'src/utils/fetchJsonFileByName'

const PapersDefinitionsContext = createContext()

const paperConfigFilenameCustom = 'papersDefinitions.json'

const PapersDefinitionsProvider = ({ children }) => {
  const client = useClient()
  const { t } = useI18n()
  const customPapersDefinitionsFlag = useFlag('customPapersDefinitions')
  const [papersDefinitions, setPapersDefinitions] = useState([])

  useEffect(() => {
    ;(async () => {
      if (customPapersDefinitionsFlag) {
        const paperJSONCustom = await fetchJsonFileByName(
          client,
          paperConfigFilenameCustom
        )
        if (paperJSONCustom) {
          log('info', 'Custom PapersDefinitions loaded')
          setPapersDefinitions(paperJSONCustom.papersDefinitions)
        } else {
          log('error', 'Please check file name & format')
        }
      } else {
        log('info', 'PapersDefinitions of the app loaded')
        setPapersDefinitions(papersJSON.papersDefinitions)
      }
    })()

    return () => {
      setPapersDefinitions([])
    }
  }, [client, customPapersDefinitionsFlag, t])

  return (
    <PapersDefinitionsContext.Provider
      value={{ papersDefinitions, setPapersDefinitions }}
    >
      {children}
    </PapersDefinitionsContext.Provider>
  )
}

export default PapersDefinitionsContext

export { PapersDefinitionsProvider }
