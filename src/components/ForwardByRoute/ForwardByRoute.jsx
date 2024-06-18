import React, { useReducer } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { ForwardModal } from 'src/components/Multiselect/ForwardModal'
import { ShareBottomSheet } from 'src/components/Multiselect/ShareBottomSheet'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
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

export const forwardByRouteLoader = async ({ request }, { client }) => {
  const fileIds = new URL(request.url).searchParams.get('fileIds').split(',')
  const currentUser = fileIds.length > 1 ? await fetchCurrentUser(client) : null
  return { currentUser }
}

export const ForwardByRoute = () => {
  const [openBottomSheet, toggleBottomSheet] = useReducer(
    openBottomSheet => !openBottomSheet,
    true
  )
  const navigate = useNavigate()
  const { currentUser } = useLoaderData()
  const [urlSearchParams] = useSearchParams()
  const { isMultiSelectionActive } = useMultiSelection()
  const { isFileSharingAvailable } = useFileSharing()
  const fileIds = urlSearchParams.get('fileIds').split(',')
  const classes = useStyles()

  const buildedFilesQuery = buildFileQueryByIds(fileIds)
  const { data: files, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const isLoading = isQueryLoading(filesQueryResult)

  const handleClose = () => navigate('..', { replace: true })
  const handleForward = () => {
    isMultiSelectionActive
      ? navigate('/paper', { replace: true })
      : navigate('..', { replace: true })
  }

  if (isLoading) {
    return (
      <Backdrop open classes={{ root: classes.backdropRoot }}>
        <Spinner size="xxlarge" color="var(--primaryContrastTextColor)" />
      </Backdrop>
    )
  }

  if (isFileSharingAvailable && openBottomSheet) {
    return (
      <ShareBottomSheet
        onClose={handleClose}
        shareByLink={toggleBottomSheet}
        currentUser={currentUser}
        files={files}
      />
    )
  }

  return (
    <ForwardModal
      files={files}
      currentUser={currentUser}
      onForward={handleForward}
      onClose={handleClose}
    />
  )
}
