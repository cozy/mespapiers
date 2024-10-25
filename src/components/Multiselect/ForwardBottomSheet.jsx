import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { LinearBackdrop } from 'src/components/Multiselect/LinearBackdrop'
import { shareAsAttachment } from 'src/components/Multiselect/helpers'

import { useClient } from 'cozy-client'
import BottomSheet, {
  BottomSheetItem
} from 'cozy-ui/transpiled/react/BottomSheet'
import Icon from 'cozy-ui/transpiled/react/Icon'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const ForwardBottomSheet = ({ onClose, filesWithPage, shareByLink }) => {
  const [showBackdrop, setShowBackdrop] = useState(false)
  const { t } = useI18n()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const client = useClient()
  const { shareFiles } = useFileSharing()
  const { isMultiSelectionActive } = useMultiSelection()

  const handleShare = async () => {
    setShowBackdrop(true)
    await shareAsAttachment({
      client,
      filesWithPage,
      shareFiles,
      showAlert,
      t,
      navigate,
      onClose,
      isMultiSelectionActive
    })
  }

  return (
    <>
      <BottomSheet backdrop onClose={onClose}>
        <BottomSheetItem disableGutters>
          <List>
            <ListItem button onClick={handleShare}>
              <ListItemIcon>
                <Icon icon="attachment" />
              </ListItemIcon>
              <ListItemText primary={t('ShareBottomSheet.attachment')} />
            </ListItem>
            <ListItem button onClick={shareByLink}>
              <ListItemIcon>
                <Icon icon="link" />
              </ListItemIcon>
              <ListItemText primary={t('ShareBottomSheet.link')} />
            </ListItem>
          </List>
        </BottomSheetItem>
      </BottomSheet>
      {showBackdrop && <LinearBackdrop />}
    </>
  )
}

ForwardBottomSheet.propTypes = {
  onClose: PropTypes.func,
  filesWithPage: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.object,
      page: PropTypes.string
    })
  ),
  shareByLink: PropTypes.func
}
