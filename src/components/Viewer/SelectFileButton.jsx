import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleFileSelecting } from 'src/components/Actions/handleFileSelecting'
import { normalizeFilesWithPage } from 'src/components/Actions/utils'
import { useModal } from 'src/components/Contexts/ModalProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const SelectFileButton = ({ file }) => {
  const { isDesktop } = useBreakpoints()
  const { t } = useI18n()
  const client = useClient()
  const { pushModal, popModal } = useModal()
  const navigate = useNavigate()
  const { addMultiSelectionItems } = useMultiSelection()

  const label = t('action.select')
  const icon = <Icon icon="select-all" />

  const handleClick = () => {
    navigate(`/paper/multiselect`)
    handleFileSelecting({
      client,
      filesWithPage: normalizeFilesWithPage([file]),
      addMultiSelectionItems,
      pushModal,
      popModal,
      t
    })
  }

  if (isDesktop) {
    return (
      <IconButton className="u-white" aria-label={label} onClick={handleClick}>
        {icon}
      </IconButton>
    )
  }

  return (
    <Button
      variant="secondary"
      aria-label={label}
      label={icon}
      onClick={handleClick}
    />
  )
}

export default SelectFileButton
