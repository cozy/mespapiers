import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'

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

export const ForwardBottomSheet = ({ onClose, files, shareByLink }) => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const { shareFiles } = useFileSharing()
  const { isMultiSelectionActive } = useMultiSelection()
  const fileIds = files.map(file => file._id)

  const shareAsAttachment = async () => {
    try {
      await shareFiles(fileIds)
      showAlert({
        message: t('ShareBottomSheet.attachmentResponse.success', {
          smart_count: fileIds.length
        }),
        severity: 'success',
        variant: 'filled'
      })
      if (isMultiSelectionActive) {
        navigate('/paper', { replace: true })
      } else {
        navigate('..', { replace: true })
      }
    } catch (error) {
      if (error.message === 'User did not share') return

      showAlert({
        message: t('ShareBottomSheet.attachmentResponse.error'),
        severity: 'error',
        variant: 'filled'
      })
    }
  }

  return (
    <BottomSheet backdrop onClose={onClose}>
      <BottomSheetItem disableGutters>
        <List>
          <ListItem button onClick={shareAsAttachment}>
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
  )
}

ForwardBottomSheet.propTypes = {
  onClose: PropTypes.func,
  files: PropTypes.array
}
