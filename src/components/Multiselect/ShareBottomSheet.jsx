import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeZipFolder } from 'src/components/Actions/utils'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import MultiselectBackdrop from 'src/components/Multiselect/MultiselectBackdrop'

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

const ShareBottomSheet = ({ onClose, files }) => {
  const { t, f } = useI18n()
  const navigate = useNavigate()
  const client = useClient()
  const { showAlert } = useAlert()
  const { shareFiles } = useFileSharing()
  const [isBackdropOpen, setIsBackdropOpen] = useState(false)
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

  const shareByLink = async () => {
    let fileToForward

    if (files.length === 1) {
      fileToForward = files[0]
    } else {
      setIsBackdropOpen(true)
      fileToForward = await makeZipFolder({ client, docs: files, t, f })
      setIsBackdropOpen(false)
    }

    navigate(`../forward/${fileToForward._id}`)
  }

  return (
    <>
      {isBackdropOpen && <MultiselectBackdrop />}

      {!isBackdropOpen && (
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
      )}
    </>
  )
}

ShareBottomSheet.propTypes = {
  onClose: PropTypes.func,
  fileIds: PropTypes.array
}

export default ShareBottomSheet
