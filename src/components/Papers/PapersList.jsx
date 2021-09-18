/* global cozy */
import React, { useMemo } from 'react'
import get from 'lodash/get'

import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Icon } from 'cozy-ui/transpiled/react'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Left from 'cozy-ui/transpiled/react/Icons/Left'

import { getPapersByLabel } from 'src/utils/queries'
import { useQuery } from 'src/components/Hooks/useQuery'
import PaperLine from 'src/components/Papers/PaperLine'

const PapersList = ({ history, match }) => {
  const { BarLeft } = cozy.bar
  const currentFileCategory = useMemo(
    () => get(match, 'params.fileCategory', null),
    [match]
  )
  const { t } = useI18n()
  const { data: allPapers } = useQuery(getPapersByLabel(currentFileCategory))

  return (
    <>
      <BarLeft>
        <IconButton className={'u-pr-1'} onClick={() => history.goBack()}>
          <Icon icon={Left} size={16} />
        </IconButton>
      </BarLeft>
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
    </>
  )
}

export default PapersList
