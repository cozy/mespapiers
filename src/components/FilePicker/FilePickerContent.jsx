import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import { models, useClient, useQuery } from 'cozy-client'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileTypeText from 'cozy-ui/transpiled/react/Icons/FileTypeText'
import FileTypeFolder from 'cozy-ui/transpiled/react/Icons/FileTypeFolder'
import LoadMore from 'cozy-ui/transpiled/react/LoadMore'

import { getFileBlob, getFileById } from './utils'
import { buildContentFolderQuery } from './queries'

const {
  file: { isDirectory, isFile }
} = models

const FilePickerContent = ({
  navigateTo,
  folderId,
  selectedFile,
  onClose,
  onError
}) => {
  const client = useClient()

  const contentFolderQuery = buildContentFolderQuery(folderId)
  const { data: contentFolder, hasMore, fetchMore } = useQuery(
    contentFolderQuery.definition,
    contentFolderQuery.options
  )

  const handleOnClick = useCallback(
    file => async () => {
      if (isDirectory(file)) {
        navigateTo(contentFolder.find(f => f._id === file._id))
      }
      if (isFile(file)) {
        try {
          const { data: fileData } = await getFileById(client, file._id)
          const fileBlob = await getFileBlob(client, fileData)

          selectedFile(fileBlob)
          onClose()
        } catch (error) {
          onError(error)
          onClose()
        }
      }
    },
    [client, contentFolder, navigateTo, onClose, onError, selectedFile]
  )

  return (
    <List>
      {contentFolder?.map((file, idx) => {
        return (
          <Fragment key={file._id}>
            <ListItem button onClick={handleOnClick(file)}>
              {isDirectory(file) && (
                <ListItemIcon>
                  <Icon icon={FileTypeFolder} width="32" height="32" />
                </ListItemIcon>
              )}
              {isFile(file) && (
                <ListItemIcon>
                  <Icon icon={FileTypeText} width="32" height="32" />
                </ListItemIcon>
              )}
              <ListItemText primary={file.name} />
            </ListItem>
            {idx !== contentFolder?.length - 1 && <Divider component="li" />}
          </Fragment>
        )
      })}
      {hasMore && <LoadMore label={'loadMore'} fetchMore={fetchMore} />}
    </List>
  )
}

FilePickerContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  folderId: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  selectedFile: PropTypes.func.isRequired,
  onError: PropTypes.func
}

export default FilePickerContent
