import React, { useReducer } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { ForwardBottomSheet } from 'src/components/Multiselect/ForwardBottomSheet'
import { ForwardModal } from 'src/components/Multiselect/ForwardModal'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import { buildFileQueryByIds } from 'src/queries'

export const forwardByRouteLoader = async ({ request }, { client }) => {
  const fileIds = new URL(request.url).searchParams.getAll('fileId')
  const pages = new URL(request.url).searchParams.getAll('page')
  const { data: files } = await client.fetchQueryAndGetFromState(
    buildFileQueryByIds(fileIds)
  )
  const currentUser = await fetchCurrentUser(client)
  const filesWithPage = fileIds.map((fileId, idx) => ({
    file: files.find(f => f._id === fileId),
    page: pages[idx] === 'null' ? null : pages[idx]
  }))

  return { currentUser, filesWithPage }
}

export const ForwardByRoute = () => {
  const [openBottomSheet, toggleBottomSheet] = useReducer(
    openBottomSheet => !openBottomSheet,
    true
  )
  const navigate = useNavigate()
  const { currentUser, filesWithPage } = useLoaderData()
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
        filesWithPage={filesWithPage}
      />
    )
  }

  return (
    <ForwardModal
      filesWithPage={filesWithPage}
      currentUser={currentUser}
      onForward={handleForward}
      onClose={handleClose}
    />
  )
}
