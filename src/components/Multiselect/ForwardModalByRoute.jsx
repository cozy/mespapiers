import React from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { ForwardModal } from 'src/components/Multiselect/ForwardModal'
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

export const forwardModalByRouteLoader = async ({ request }, { client }) => {
  const fileIds = new URL(request.url).searchParams.get('fileIds').split(',')
  const currentUser = fileIds.length > 1 ? await fetchCurrentUser(client) : null
  return { currentUser }
}

export const ForwardModalByRoute = () => {
  const navigate = useNavigate()
  const { currentUser } = useLoaderData()
  const [urlSearchParams] = useSearchParams()
  const { isMultiSelectionActive } = useMultiSelection()
  const fileIds = urlSearchParams.get('fileIds').split(',')
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

  return (
    <ForwardModal
      files={files}
      currentUser={currentUser}
      onForward={() =>
        isMultiSelectionActive
          ? navigate('/paper', { replace: true })
          : navigate('..', { replace: true })
      }
      onClose={() => navigate('..', { replace: true })}
    />
  )
}
