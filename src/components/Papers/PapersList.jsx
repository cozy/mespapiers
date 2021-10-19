/* global cozy */
import React, { useState, useMemo, useEffect } from 'react'

import { useClient } from 'cozy-client'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { Icon } from 'cozy-ui/transpiled/react'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import UIBarTitle from 'cozy-ui/transpiled/react/BarTitle'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Left from 'cozy-ui/transpiled/react/Icons/Left'

import { getPapersByLabel } from 'src/helpers/queries'
import { useQueryCozy } from 'src/components/Hooks/useQueryCozy'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import PaperLine from 'src/components/Papers/PaperLine'

const PapersList = ({ history, match }) => {
  const client = useClient()
  const scannerT = useScannerI18n()
  const [subheaderLabel, setSubheaderLabel] = useState(null)
  const { BarLeft, BarCenter } = cozy.bar
  const currentFileCategory = useMemo(
    () => match?.params?.fileCategory || null,
    [match]
  )
  const { data: allPapers } = useQueryCozy(
    getPapersByLabel(currentFileCategory)
  )
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
      <BarCenter>
        {/* Need to repeat the theme since the bar is in another react portal */}
        <CozyTheme variant="normal">
          <UIBarTitle>{categoryLabel}</UIBarTitle>
        </CozyTheme>
      </BarCenter>

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
