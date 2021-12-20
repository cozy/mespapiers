import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import { useQuery, hasQueryBeenLoaded } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Previous from 'cozy-ui/transpiled/react/Icons/Previous'

import Breadcrumb from './Breadcrumb'
import { buildCurrentFolderQuery } from './queries'

const ROOT_DIR_ID = 'io.cozy.files.root-dir'

/**
 * @param {IOCozyFolder} displayedFolder - An io.cozy.files folder
 * @returns {{id: string, name: string}[]}
 */
const getBreadcrumbPath = displayedFolder => {
  return uniqBy(
    [
      {
        id: ROOT_DIR_ID
      },
      {
        id: get(displayedFolder, 'dir_id')
      },
      {
        id: displayedFolder.id,
        name: displayedFolder.name
      }
    ],
    'id'
  )
    .filter(({ id }) => Boolean(id))
    .map(breadcrumb => ({
      id: breadcrumb.id,
      name: breadcrumb.name || (breadcrumb.id === ROOT_DIR_ID ? 'Drive' : '…')
    }))
}

const FilePickerHeader = ({ navigateTo, folderId }) => {
  const { isMobile } = useBreakpoints()

  const currentFolderQuery = buildCurrentFolderQuery(folderId)
  const { data: currentFolder, ...restCurrentFolder } = useQuery(
    currentFolderQuery.definition,
    currentFolderQuery.options
  )

  const path = hasQueryBeenLoaded(restCurrentFolder)
    ? getBreadcrumbPath(currentFolder[0])
    : []

  const showPreviousButton = path.length > 1 && isMobile

  const onBack = useCallback(path => () => navigateTo(path), [navigateTo])

  return (
    <div className={'u-flex u-flex-items-center'}>
      {showPreviousButton && (
        <IconButton
          onClick={onBack(path[path.length - 2])}
          className={'u-p-0 u-pr-1'}
        >
          <Icon icon={Previous} />
        </IconButton>
      )}
      <Breadcrumb
        path={path}
        onBreadcrumbClick={navigateTo}
        opening={false}
        inlined
      />
    </div>
  )
}

FilePickerHeader.propTypes = {
  folderId: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired
}

export default FilePickerHeader
