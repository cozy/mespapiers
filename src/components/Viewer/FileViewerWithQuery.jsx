import React, { useCallback } from 'react'
import get from 'lodash/get'

import { useQuery } from 'cozy-client'

import { buildViewerFileQuery } from 'src/utils/queries'
import FileViewerLoading from 'src/components/Viewer/FileViewerLoading'

// TODO improve it & PR cozy-ui
const FilesViewerWithQuery = props => {
  const { match } = props

  const getCurrentFileId = useCallback(
    () => get(match, 'params.fileId', null),
    [match]
  )
  const buildedFilesQuery = buildViewerFileQuery(getCurrentFileId())
  const filesQuery = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )

  if (filesQuery.data) {
    return <>FileViewer</>
  } else {
    return <FileViewerLoading />
  }
}

export default FilesViewerWithQuery
