import PropTypes from 'prop-types'
import React from 'react'
import CategoryItemByKonnector from 'src/components/Papers/CategoryItemByKonnector'
import { makeQualificationLabelsWithoutFiles } from 'src/components/Papers/helpers'
import { queryAccounts } from 'src/helpers/queries'

import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

const KonnectorsCategories = ({
  konnectors,
  selectedThemes,
  onClick,
  hasPapers
}) => {
  const { data: accounts, ...accountsQueryLeft } = useQuery(
    queryAccounts.definition,
    queryAccounts.options
  )
  const isLoading =
    isQueryLoading(accountsQueryLeft) && !hasQueryBeenLoaded(accountsQueryLeft)

  if (isLoading) return null

  const konnectorsWithAccounts = konnectors.filter(({ konnector }) =>
    accounts.some(account => account.account_type === konnector.slug)
  )

  const qualificationLabelsWithoutFiles = makeQualificationLabelsWithoutFiles(
    konnectorsWithAccounts,
    selectedThemes
  )

  return qualificationLabelsWithoutFiles.map((qualificationLabel, index) => (
    <CategoryItemByKonnector
      key={`${index} - ${qualificationLabel}`}
      qualificationLabel={qualificationLabel}
      isFirst={index === 0 && hasPapers}
      isLast={index === qualificationLabelsWithoutFiles.length - 1}
      onClick={onClick}
    />
  ))
}

KonnectorsCategories.propTypes = {
  konnectors: PropTypes.arrayOf(PropTypes.object),
  selectedThemes: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  hasPapers: PropTypes.bool
}

export default KonnectorsCategories
