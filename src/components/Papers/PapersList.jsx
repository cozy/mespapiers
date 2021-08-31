import React from 'react'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { getAllPapers } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import PaperLine from 'src/components/Papers/PaperLine'

const PapersList = () => {
  const { t } = useI18n()
  const { allPapers } = useQuery(getAllPapers)

  return (
    <List>
      <ListSubheader>{t('PapersList.subheader')}</ListSubheader>
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
  )
}

export default PapersList
