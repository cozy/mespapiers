import React, { useReducer } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { ForwardBottomSheet } from 'src/components/Multiselect/ForwardBottomSheet'
import { ForwardModal } from 'src/components/Multiselect/ForwardModal'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import { buildFileQueryByIds } from 'src/queries'

export const forwardByRouteLoader = async ({ request }, { client }) => {
  const fileIds = new URL(request.url).searchParams.get('fileIds').split(',')
  const { data: files } = await client.fetchQueryAndGetFromState(
    buildFileQueryByIds(fileIds)
  )
  const currentUser = fileIds.length > 1 ? await fetchCurrentUser(client) : null
  return { currentUser, files }
}

export const ForwardByRoute = () => {
  const [openBottomSheet, toggleBottomSheet] = useReducer(
    openBottomSheet => !openBottomSheet,
    true
  )
  const navigate = useNavigate()
  const { currentUser, files } = useLoaderData()
  const { isMultiSelectionActive } = useMultiSelection()
  const { isFileSharingAvailable } = useFileSharing()

  const handleClose = () => navigate('..', { replace: true })
  const handleForward = () => {
    isMultiSelectionActive
      ? navigate('/paper', { replace: true })
      : navigate('..', { replace: true })
  }

  if (isFileSharingAvailable && openBottomSheet) {
    return (
      <ForwardBottomSheet
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
