/* global cozy */
import React, { useState, useMemo, useEffect } from 'react'

import { useClient } from 'cozy-client'
import { fetchCurrentUser } from 'src/utils/fetchCurrentUser'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { Icon } from 'cozy-ui/transpiled/react'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Left from 'cozy-ui/transpiled/react/Icons/Left'

import { getPapersByLabel } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import PaperLine from 'src/components/Papers/PaperLine'

const PapersList = ({ history, match }) => {
  const client = useClient()
  const scannerT = useScannerI18n()
  const [subheaderLabel, setSubheaderLabel] = useState(null)
  const { BarLeft } = cozy.bar
  const currentFileCategory = useMemo(
    () => match?.params?.fileCategory || null,
    [match]
  )
  const { data: allPapers } = useQuery(getPapersByLabel(currentFileCategory))
  const categoryLabel = scannerT(`items.${currentFileCategory}`)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const user = await fetchCurrentUser(client)
        isMounted && setSubheaderLabel(user ? user.fullname : categoryLabel)
      } catch (err) {
        setSubheaderLabel(categoryLabel)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [client, categoryLabel])

  return (
    <>
      <BarLeft>
        <IconButton className={'u-pr-1'} onClick={() => history.goBack()}>
          <Icon icon={Left} size={16} />
        </IconButton>
      </BarLeft>
      <List>
        <ListSubheader>{subheaderLabel}</ListSubheader>
        <div className={'u-pv-half'}>
          {allPapers.map((paper, idx) => (
            <PaperLine
              key={idx}
              paper={paper}
              divider={idx !== allPapers.length - 1}
            />
          ))}
        </div>
      </List>
    </>
  )
}

export default PapersList
