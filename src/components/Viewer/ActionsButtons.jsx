import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleFileForwarding } from 'src/components/Actions/handleFileForwarding'
import { normalizeFilesWithPage } from 'src/components/Actions/utils'
import { useModal } from 'src/components/Contexts/ModalProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import SelectFileButton from 'src/components/Viewer/SelectFileButton'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { ForwardButton } from 'cozy-viewer'

const ActionsButtons = ({ file, toolbar }) => {
  const navigate = useNavigate()
  const { client } = useClient()
  const { pushModal, popModal } = useModal()
  const { t } = useI18n()
  const { isMultiSelectionActive } = useMultiSelection()

  if (isMultiSelectionActive) return null

  const handleForwardClick = () => {
    handleFileForwarding({
      client,
      filesWithPage: normalizeFilesWithPage([file]),
      pushModal,
      popModal,
      navigate,
      t
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
