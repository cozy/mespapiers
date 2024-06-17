import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ShareBottomSheet from 'src/components/Multiselect/ShareBottomSheet'
import { buildFileQueryByIds } from 'src/queries'

import { isQueryLoading, useQuery } from 'cozy-client'
import Backdrop from 'cozy-ui/transpiled/react/Backdrop'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles({
  backdropRoot: {
    zIndex: 'var(--zIndex-modal)'
  }
})

const ShareBottomSheetByRoute = () => {
  const navigate = useNavigate()
  const [URLSearchParams] = useSearchParams()
  const fileIds = URLSearchParams.get('fileIds').split(',')
  const classes = useStyles()

  const buildedFilesQuery = buildFileQueryByIds(fileIds)
  const { data: files, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const isLoading = isQueryLoading(filesQueryResult)

  if (isLoading) {
    return (
      <Backdrop open classes={{ root: classes.backdropRoot }}>
        <Spinner size="xxlarge" color="var(--primaryContrastTextColor)" />
      </Backdrop>
    )
  }

  return <ShareBottomSheet onClose={() => navigate('..')} files={files} />
}

export default ShareBottomSheetByRoute
