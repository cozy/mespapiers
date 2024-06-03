import PropTypes from 'prop-types'
import React from 'react'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'
import CategoryItemByPaper from 'src/components/Papers/CategoryItemByPaper'

import Empty from 'cozy-ui/transpiled/react/Empty'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const CategoriesByPaper = ({ papersByCategories, onClick }) => {
  const { t } = useI18n()
  const hasPapers = Object.keys(papersByCategories).length > 0

  if (!hasPapers) {
    return (
      <Empty
        className="u-ph-1"
        icon={HomeCloud}
        iconSize="large"
        title={t('Home.Empty.title')}
      />
    )
  }

  return Object.entries(papersByCategories).map(([category, papers], index) => (
    <CategoryItemByPaper
      key={category}
      category={category}
      papers={papers}
      isLast={index === Object.entries(papersByCategories).length - 1}
      onClick={onClick}
    />
  ))
}

CategoriesByPaper.propTypes = {
  papersByCategories: PropTypes.object,
  onClick: PropTypes.func
}
