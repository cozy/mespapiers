/* global cozy */
import React, { useState, useMemo, useEffect } from 'react'

import { useClient, useQuery } from 'cozy-client'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import UIBarTitle from 'cozy-ui/transpiled/react/BarTitle'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'

import { getPapersByLabel } from 'src/helpers/queries'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import PaperLine from 'src/components/Papers/PaperLine'
import makeActions from 'src/components/Actions/makeActions'
import { useModal } from 'src/components/Hooks/useModal'
import {
  download,
  forward,
  hr,
  trash,
  offline,
  viewInDrive
} from 'src/components/Actions/Actions'

const PapersList = ({ history, match }) => {
  const client = useClient()
  const scannerT = useScannerI18n()
  const { pushModal, popModal } = useModal()
  const [subheaderLabel, setSubheaderLabel] = useState(null)
  const { BarLeft, BarCenter } = cozy.bar
  const currentFileCategory = useMemo(
    () => match?.params?.fileCategory || null,
    [match]
  )
  const categoryLabel = scannerT(`items.${currentFileCategory}`)

  const buildPapersByLabel = useMemo(
    () => getPapersByLabel(currentFileCategory),
    [currentFileCategory]
  )
  const { data: allPapers } = useQuery(
    buildPapersByLabel.definition,
    buildPapersByLabel.options
  )

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

  const actionsOptions = useMemo(
    () => ({
      client,
      pushModal,
      popModal
    }),
    [client, popModal, pushModal]
  )
  const actionVariant = navigator.share ? forward : download
  const actions = useMemo(
    () =>
      makeActions(
        [actionVariant, viewInDrive, offline, hr, trash],
        actionsOptions
      ),
    [actionVariant, actionsOptions]
  )

  return (
    <>
      <BarLeft>
        <IconButton className={'u-pr-1'} onClick={() => history.push('/')}>
          <Icon icon={Previous} size={16} />
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
          {allPapers?.map((paper, idx) => (
            <PaperLine
              key={idx}
              paper={paper}
              divider={idx !== allPapers.length - 1}
              actions={actions}
            />
          ))}
        </div>
      </List>
    </>
  )
}

export default PapersList
