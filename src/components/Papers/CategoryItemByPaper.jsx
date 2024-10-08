import PropTypes from 'prop-types'
import React from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'

import { useClient } from 'cozy-client'
import { isNote } from 'cozy-client/dist/models/file'
import { isExpiringSoon } from 'cozy-client/dist/models/paper'
import Badge from 'cozy-ui/transpiled/react/Badge'
import Divider from 'cozy-ui/transpiled/react/Divider'
import { FileImageLoader } from 'cozy-ui/transpiled/react/FileImageLoader'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Skeleton from 'cozy-ui/transpiled/react/Skeleton'
import Thumbnail from 'cozy-ui/transpiled/react/Thumbnail'

const CategoryItemByPaper = ({ papers, category, isLast, onClick }) => {
  const client = useClient()
  const scannerT = useScannerI18n()
  const isStacked = papers.length > 1

  const countPapersAboutToExpire = papers.filter(
    paper => isExpiringSoon(paper) && !paper.metadata.hideExpirationAlert
  ).length

  return (
    <>
      <ListItem button onClick={() => onClick(category)}>
        <ListItemIcon>
          <Badge
            overlap="rectangular"
            badgeContent={countPapersAboutToExpire}
            color="warning"
            showZero={false}
          >
            <FileImageLoader
              client={client}
              file={papers[0]}
              linkType="tiny"
              render={src => {
                return (
                  <Thumbnail isStacked={isStacked}>
                    {src ? (
                      <img src={src} alt="" />
                    ) : (
                      <Skeleton variant="rect" animation="wave" />
                    )}
                  </Thumbnail>
                )
              }}
              renderFallback={() => (
                <Thumbnail isStacked={isStacked}>
                  <Icon
                    icon={
                      isNote(papers[0]) ? 'file-type-note' : 'file-type-text'
                    }
                  />
                </Thumbnail>
              )}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={scannerT(`items.${category}`, {
            smart_count: papers.length
          })}
        />
        <Icon icon="right" />
      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </>
  )
}

CategoryItemByPaper.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  isLast: PropTypes.bool,
  onClick: PropTypes.func
}

export default CategoryItemByPaper
