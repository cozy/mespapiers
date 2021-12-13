/* global cozy */
import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  useQuery,
  getReferencedBy,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import UIBarTitle from 'cozy-ui/transpiled/react/BarTitle'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'
import { Spinner } from 'cozy-ui/transpiled/react/Spinner'

import { getContactByIds, getPapersByLabel } from 'src/helpers/queries'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { PapersFab } from 'src/components/PapersFab/PapersFab'
import { CONTACTS_DOCTYPE } from 'src/doctypes'
import { buildPaperslistByContact } from 'src/helpers/buildPaperslistByContact'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import PapersListByContact from 'src/components/Papers/PapersListByContact'

const PapersListWrapper = ({ history, match }) => {
  const scannerT = useScannerI18n()
  const { t } = useI18n()
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
        defaultName: t('PapersList.defaultName'),
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
    t,
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
        <PapersListByContact paperslistByContact={paperslistByContact} />
      ) : (
        <Spinner size="xxlarge" className="u-flex u-flex-justify-center" />
      )}
      <PapersFab />
    </>
  )
}

PapersListWrapper.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      fileCategory: PropTypes.string.isRequired
    })
  })
}

export default PapersListWrapper
