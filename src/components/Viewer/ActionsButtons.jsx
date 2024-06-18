import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import SelectFileButton from 'src/components/Viewer/SelectFileButton'

import { ForwardButton } from 'cozy-ui/transpiled/react/Viewer'

const ActionsButtons = ({ file, toolbar }) => {
  const navigate = useNavigate()
  const { isMultiSelectionActive } = useMultiSelection()

  if (isMultiSelectionActive) return null

  const handleForwardClick = () => {
    const fileId = file._id
    navigate({
      pathname: 'forward',
      search: `?fileIds=${fileId}`
    })
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
