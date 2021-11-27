/* global cozy */
import React, { useMemo, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useClient, useQuery } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import UIBarTitle from 'cozy-ui/transpiled/react/BarTitle'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'

import { getContactByIds, getPapersByLabel } from 'src/helpers/queries'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import PaperLine from 'src/components/Papers/PaperLine'
import { PapersFab } from 'src/components/PapersFab/PapersFab'
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
import { getReferencedBy } from 'src/utils/referencedBy'
import { CONTACTS_DOCTYPE } from 'src/doctypes'
import { buildPaperslistByContact } from 'src/helpers/buildPaperslistByContact'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const PapersList = ({ history, match }) => {
  const client = useClient()
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const scannerT = useScannerI18n()
  const { pushModal, popModal } = useModal()
  const { BarLeft, BarCenter } = cozy.bar
  const currentFileCategory = useMemo(
    () => match?.params?.fileCategory || null,
    [match]
  )
  const categoryLabel = scannerT(`items.${currentFileCategory}`)
  const buildPapersByLabel = getPapersByLabel(currentFileCategory)

  const { data: allPapers } = useQuery(
    buildPapersByLabel.definition,
    buildPapersByLabel.options
  )

  const contactsIds = Array.isArray(allPapers)
    ? allPapers.flatMap(paper =>
        getReferencedBy(paper, CONTACTS_DOCTYPE).map(
          contactRef => contactRef.id
        )
      )
    : []
  const contactsByIdsQuery = getContactByIds(contactsIds)
  const { data: contactList } = useQuery(
    contactsByIdsQuery.definition,
    contactsByIdsQuery.options
  )

  const paperslistByContact = useMemo(
    () => buildPaperslistByContact(allPapers, contactList),
    [allPapers, contactList]
  )

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
        {paperslistByContact?.map((paperByContact, idx) => (
          <Fragment key={idx}>
            <ListSubheader classes={isMobile && classes}>
              {paperByContact.contact}
            </ListSubheader>
            <div className={'u-pv-half'}>
              {paperByContact.papers.map((paper, idx) => (
                <PaperLine
                  key={idx}
                  paper={paper}
                  divider={idx !== paperByContact.papers.length - 1}
                  actions={actions}
                />
              ))}
            </div>
          </Fragment>
        ))}
      </List>
      <PapersFab />
    </>
  )
}

export default PapersList
