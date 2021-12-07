/* global cozy */
import React, { useMemo, useCallback, Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import {
  useClient,
  useQuery,
  getReferencedBy,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Button from 'cozy-ui/transpiled/react/Button'
import UIBarTitle from 'cozy-ui/transpiled/react/BarTitle'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Spinner } from 'cozy-ui/transpiled/react/Spinner'

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
import { CONTACTS_DOCTYPE } from 'src/doctypes'
import { buildPaperslistByContact } from 'src/helpers/buildPaperslistByContact'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const PapersList = ({ history, match }) => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const scannerT = useScannerI18n()
  const { papersDefinitions } = usePapersDefinitions()
  const { BarLeft, BarCenter } = cozy.bar
  const backButtonAction = useCallback(() => history.push('/'), [history])
  const currentFileCategory = useMemo(
    () => match?.params?.fileCategory || null,
    [match]
  )
  const categoryLabel = scannerT(`items.${currentFileCategory}`)
  const buildPapersByLabel = getPapersByLabel(currentFileCategory)

  const {
    data: papersList,
    hasMore: hasMorePapers,
    fetchMore: fetchMorepapers,
    ...restPapers
  } = useQuery(buildPapersByLabel.definition, buildPapersByLabel.options)

  if (hasMorePapers) fetchMorepapers()

  const contactsIds = Array.isArray(papersList)
    ? papersList.flatMap(paper =>
        getReferencedBy(paper, CONTACTS_DOCTYPE).map(
          contactRef => contactRef.id
        )
      )
    : []
  const contactsByIdsQuery = getContactByIds(contactsIds)
  const { data: contactsList, ...restContacts } = useQuery(
    contactsByIdsQuery.definition,
    {
      ...contactsByIdsQuery.options,
      enabled: !hasMorePapers
    }
  )

  const paperslistByContact = useMemo(() => {
    if (
      !isQueryLoading(restPapers) &&
      hasQueryBeenLoaded(restPapers) &&
      !isQueryLoading(restContacts) &&
      hasQueryBeenLoaded(restContacts) &&
      !hasMorePapers
    ) {
      return buildPaperslistByContact({
        papersList,
        contactsList,
        papersDefinitions,
        currentFileCategory
      })
    }
    return []
  }, [
    restPapers,
    restContacts,
    hasMorePapers,
    papersList,
    contactsList,
    papersDefinitions,
    currentFileCategory
  ])

  return (
    <>
      <BarLeft>
        <IconButton className={'u-mr-half'} onClick={backButtonAction}>
          <Icon icon={Previous} size={16} />
        </IconButton>
      </BarLeft>
      <BarCenter>
        {/* Need to repeat the theme since the bar is in another react portal */}
        <CozyTheme variant="normal">
          <UIBarTitle>{categoryLabel}</UIBarTitle>
        </CozyTheme>
      </BarCenter>

      {paperslistByContact.length > 0 ? (
        <List>
          {paperslistByContact?.map(({ contact, papers }, idx) => (
            <Fragment key={idx}>
              <ListSubheader classes={isMobile && classes}>
                {contact}
              </ListSubheader>
              <PapersListByContact papers={papers} />
            </Fragment>
          ))}
        </List>
      ) : (
        <Spinner size="xxlarge" className="u-flex u-flex-justify-center" />
      )}
      <PapersFab />
    </>
  )
}

const PapersListByContact = ({ papers }) => {
  const client = useClient()
  const { t } = useI18n()
  const { pushModal, popModal } = useModal()
  const [maxDisplay, setMaxDisplay] = useState(papers.maxDisplay)

  const actionVariant = navigator.share ? forward : download
  const actions = useMemo(
    () =>
      makeActions([actionVariant, viewInDrive, offline, hr, trash], {
        client,
        pushModal,
        popModal
      }),
    [actionVariant, client, popModal, pushModal]
  )

  const handleClick = () => {
    setMaxDisplay(papers.list.length)
  }

  return (
    <div className={'u-pv-half'}>
      {papers.list.map(
        (paper, idx) =>
          idx + 1 <= maxDisplay && (
            <PaperLine
              key={idx}
              paper={paper}
              divider={idx !== papers.list.length - 1}
              actions={actions}
            />
          )
      )}
      {maxDisplay < papers.list.length && (
        <Button
          theme={'text'}
          className={'u-mh-0 u-mv-half'}
          label={t(`PapersList.PapersListByContact.seeMore`, {
            number: papers.list.length - maxDisplay
          })}
          size={'small'}
          onClick={handleClick}
        />
      )}
    </div>
  )
}

PapersList.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      fileCategory: PropTypes.string.isRequired
    })
  })
}

PapersListByContact.propTypes = {
  papers: PropTypes.shape({
    maxDisplay: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.object)
  })
}

export default PapersList
