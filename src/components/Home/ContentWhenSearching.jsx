import PropTypes from 'prop-types'
import React from 'react'
import { makePapersGroupByQualificationLabel } from 'src/components/Home/helpers'
import { useSearchResult } from 'src/components/Hooks/useSearchResult'
import PaperGroup from 'src/components/Papers/PaperGroup'
import FlexsearchResult from 'src/components/SearchResult/FlexsearchResult'

import Empty from 'cozy-ui/transpiled/react/Empty'
import ListSkeleton from 'cozy-ui/transpiled/react/Skeletons/ListSkeleton'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SearchEmpty from '../../assets/icons/SearchEmpty.svg'

const ContentWhenSearching = ({
  papers,
  contacts,
  konnectors,
  searchValue,
  selectedThemes
}) => {
  const { t } = useI18n()

  const { loading, hasResult, filteredDocs, showResultByGroup } =
    useSearchResult({
      papers,
      contacts,
      searchValue,
      selectedThemes
    })

  if (loading) {
    return <ListSkeleton count={6} />
  }

  if (!hasResult) {
    return (
      <Empty
        className="u-ph-1"
        icon={SearchEmpty}
        iconSize="large"
        title={t('Search.empty.title')}
        text={t('Search.empty.text')}
      />
    )
  }

  if (showResultByGroup) {
    const papersByCategories = makePapersGroupByQualificationLabel(filteredDocs)

    return (
      <PaperGroup
        papersByCategories={papersByCategories}
        konnectors={konnectors}
        selectedThemes={selectedThemes}
      />
    )
  }

  return <FlexsearchResult filteredDocs={filteredDocs} />
}

ContentWhenSearching.propTypes = {
  contacts: PropTypes.array,
  papers: PropTypes.array,
  konnectors: PropTypes.array,
  selectedThemes: PropTypes.arrayOf(PropTypes.object),
  searchValue: PropTypes.string
}

export default ContentWhenSearching
