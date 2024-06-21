import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RemindersAnnotation } from 'src/components/Papers/RemindersAnnotation'
import { generateReturnUrlToNotesIndex } from 'src/components/Papers/helpers'
import { APPS_DOCTYPE } from 'src/constants'

import { useClient, Q } from 'cozy-client'
import { isInstalled } from 'cozy-client/dist/models/applications'
import { isNote, splitFilename } from 'cozy-client/dist/models/file'
import FileImageLoader from 'cozy-ui/transpiled/react/FileImageLoader'
import Filename from 'cozy-ui/transpiled/react/Filename'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Skeleton from 'cozy-ui/transpiled/react/Skeleton'
import Thumbnail from 'cozy-ui/transpiled/react/Thumbnail'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const MultiSelectPaperItem = ({
  item,
  className,
  classes,
  children
}) => {
  const { t, f } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isMobile } = useBreakpoints()
  const { file, page } = item

  const paperDate = file?.metadata?.datetime
    ? f(file?.metadata?.datetime, 'DD/MM/YYYY')
    : null

  const handleClick = async () => {
    if (isNote(file)) {
      const { data: apps } = await client.query(Q(APPS_DOCTYPE))
      const isNoteAppInstalled = !!isInstalled(apps, { slug: 'notes' })
      if (!isNoteAppInstalled) {
        return navigate({
          pathname: `${pathname}/installAppIntent`,
          // Add fileId to the redirect URL to ease redirecting to the note after the installation
          search: `redirect=${pathname}&fileId=${file.id}`
        })
      }
      const webLink = await generateReturnUrlToNotesIndex(client, file)
      window.open(webLink, '_self')
    } else {
      navigate(`/paper/multiselect/view/${file._id}`)
    }
  }

  const secondaryText = (
    <>
      {isNote(file) && <RemindersAnnotation file={file} />}
      {paperDate ? paperDate : ''}
      {page && (
        <>
          {paperDate ? ' · ' : ''}
          {t(`Multiselect.page.${page}`)}
        </>
      )}
    </>
  )

  return (
    <ListItem
      button
      className={className}
      classes={classes}
      onClick={handleClick}
    >
      <ListItemIcon className="u-mh-1">
        <FileImageLoader
          client={client}
          file={file}
          linkType="tiny"
          render={src => {
            return (
              <Thumbnail>
                {src ? (
                  <img src={src} alt="" />
                ) : (
                  <Skeleton variant="rect" animation="wave" />
                )}
              </Thumbnail>
            )
          }}
          renderFallback={() => (
            <Thumbnail>
              <Icon icon={isNote(file) ? 'file-type-note' : 'file-type-text'} />
            </Thumbnail>
          )}
        />
      </ListItemIcon>

      <ListItemText
        className="u-mr-1"
        primary={
          <Filename
            variant="body1"
            midEllipsis={isMobile}
            filename={
              splitFilename({
                name: file.name,
                type: 'file'
              }).filename
            }
            extension={
              splitFilename({
                name: file.name,
                type: 'file'
              }).extension
            }
          />
        }
        secondary={secondaryText}
      />

      {children && (
        <ListItemSecondaryAction>{children}</ListItemSecondaryAction>
      )}
    </ListItem>
  )
}

MultiSelectPaperItem.propTypes = {
  item: PropTypes.shape({
    file: PropTypes.object.isRequired,
    page: PropTypes.number
  }).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object
}
