import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Hooks/useMultiSelection'
import SelectFileButton from 'src/components/Viewer/SelectFileButton'

import { ForwardButton } from 'cozy-ui/transpiled/react/Viewer'

const ActionsButtons = ({ file, toolbar }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isMultiSelectionActive } = useMultiSelection()
  const { isFileSharingAvailable } = useFileSharing()

  if (isMultiSelectionActive) return null

  const handleForwardClick = () => {
    const fileId = file._id
    if (isFileSharingAvailable) {
      navigate(`${pathname}/share`, {
        state: { fileId }
      })
    } else {
      navigate(`${pathname}/forward/${fileId}`)
    }
  }

  return (
    <>
      <ForwardButton
        file={file}
        variant={toolbar ? 'iconButton' : 'default'}
        onClick={handleForwardClick}
      />
      <SelectFileButton file={file} />
    </>
  )
}

ActionsButtons.propTypes = {
  file: PropTypes.object,
  toolbar: PropTypes.bool
}

export default ActionsButtons