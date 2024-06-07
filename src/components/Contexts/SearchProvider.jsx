import React, { createContext, useContext, useMemo, useState } from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import {
  addAllOnce,
  makeRealtimeConnection,
  search
} from 'src/components/Search/helpers'

import { useClient } from 'cozy-client'
import useRealtime from 'cozy-realtime/dist/useRealtime'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

const SearchProvider = ({ doctypes, children }) => {
  const [isInit, setIsInit] = useState(false)
  const client = useClient()
  const scannerT = useScannerI18n()
  const { t } = useI18n()

  const realtimeConnection = useMemo(
    () => makeRealtimeConnection(doctypes, scannerT, t),
    [doctypes, scannerT, t]
  )
  useRealtime(client, realtimeConnection)

  const value = useMemo(() => {
    return {
      addAllOnce: addAllOnce({
        isAdded: isInit,
        setIsAdded: setIsInit,
        scannerT,
        t
      }),
      search
    }
  }, [isInit, t, scannerT])

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider
