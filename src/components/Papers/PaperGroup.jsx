import React, { Fragment, useCallback, useMemo } from 'react'
import get from 'lodash/get'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { useQuery } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import IconPdf from 'cozy-ui/transpiled/react/Icons/FileTypePdf'
import Right from 'cozy-ui/transpiled/react/Icons/Right'

import { getAllQualificationLabel } from 'src/helpers/queries'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const PaperGroup = () => {
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const history = useHistory()
  const { t } = useI18n()
  const scannerT = useScannerI18n()
  const { papersDefinitions } = usePapersDefinitions()

  const allQualificationLabel = useMemo(
    () => getAllQualificationLabel(papersDefinitions),
    [papersDefinitions]
  )
  const { data: allPapers } = useQuery(
    allQualificationLabel.definition,
    allQualificationLabel.options
  )

  const categories = allPapers
    ? [
        ...new Set(
          allPapers.map(paper => {
            const label = get(paper, 'metadata.qualification.label')
            return label
          })
        )
      ]
    : []

  const goPapersList = useCallback(
    category => {
      history.push({
        pathname: `/files/${category}`
      })
    },
    [history]
  )

  return (
    <List>
      <ListSubheader classes={isMobile && classes}>
        {t('PapersList.subheader')}
      </ListSubheader>
      <div className={'u-pv-half'}>
        {categories.map((category, idx) => (
          <Fragment key={idx}>
            <ListItem button onClick={() => goPapersList(category)}>
              <ListItemIcon>
                <Icon icon={IconPdf} size={32} />
              </ListItemIcon>
              <ListItemText primary={scannerT(`items.${category}`)} />
              <Icon
                icon={Right}
                size={16}
                color={'var(--secondaryTextColor)'}
              />
            </ListItem>
            {idx !== categories.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Fragment>
        ))}
      </div>
    </List>
  )
}

export default PaperGroup
