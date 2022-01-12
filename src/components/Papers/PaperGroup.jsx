import React, { Fragment, useCallback, useMemo } from 'react'
import get from 'lodash/get'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import uniqBy from 'lodash/uniqBy'

import { useQuery, useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import FileTypeImage from 'cozy-ui/transpiled/react/Icons/FileTypeImage'
import Right from 'cozy-ui/transpiled/react/Icons/Right'
import MuiCardMedia from 'cozy-ui/transpiled/react/CardMedia'
import { FileImageLoader } from 'cozy-ui/transpiled/react/FileImageLoader'

import { getAllQualificationLabel } from 'src/helpers/queries'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const PaperGroup = () => {
  const classes = useStyles()
  const client = useClient()
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

  const allPapersByCategories = allPapers
    ? uniqBy(allPapers, 'metadata.qualification.label')
    : []

  const goPapersList = useCallback(
    category => {
      history.push({
        pathname: `/files/${category}`
      })
    },
    [history]
  )

  const getLinkType = useCallback(paper => {
    const isImage = paper.class === 'image'
    const isPdf = paper.class === 'pdf'
    return isImage ? 'small' : isPdf ? 'icon' : undefined
  }, [])

  return (
    <List>
      <ListSubheader classes={isMobile && classes}>
        {t('PapersList.subheader')}
      </ListSubheader>
      <div className={'u-pv-half'}>
        {allPapersByCategories.map((paper, idx) => {
          const category = get(paper, 'metadata.qualification.label')

          return (
            <Fragment key={idx}>
              <ListItem button onClick={() => goPapersList(category)}>
                <ListItemIcon>
                  <FileImageLoader
                    client={client}
                    file={paper}
                    linkType={getLinkType(paper)}
                    render={src => (
                      <MuiCardMedia
                        component={'img'}
                        width={32}
                        height={32}
                        image={src}
                      />
                    )}
                    renderFallback={() => (
                      <Icon icon={FileTypeImage} size={32} />
                    )}
                  />
                </ListItemIcon>
                <ListItemText primary={scannerT(`items.${category}`)} />
                <Icon
                  icon={Right}
                  size={16}
                  color={'var(--secondaryTextColor)'}
                />
              </ListItem>
              {idx !== allPapersByCategories.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Fragment>
          )
        })}
      </div>
    </List>
  )
}

export default PaperGroup
