import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFileSharing } from 'src/components/Contexts/FileSharingProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { LinearBackdrop } from 'src/components/Multiselect/LinearBackdrop'
import {
  createPdfFileByPage,
  removeFilesPermanently
} from 'src/components/Multiselect/helpers'
import { filterWithRemaining } from 'src/helpers/filterWithRemaining'

import { useClient } from 'cozy-client'
import minilog from 'cozy-minilog'
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
const log = minilog('ForwardBottomSheet')

export const ForwardBottomSheet = ({ onClose, filesWithPage, shareByLink }) => {
  const [showBackdrop, setShowBackdrop] = useState(false)
  const { t } = useI18n()
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const client = useClient()
  const { shareFiles } = useFileSharing()
  const { isMultiSelectionActive } = useMultiSelection()
  const {
    itemsFound: filesWithSpecificPage,
    remainingItems: filesWithoutSpecificPage
  } = filterWithRemaining(filesWithPage, ({ page }) => page)

  const shareAsAttachment = async () => {
    setShowBackdrop(true)
    const fileIds = filesWithoutSpecificPage.map(({ file }) => file._id)
    try {
      if (filesWithSpecificPage.length > 0) {
        const newFiles = await createPdfFileByPage({
          client,
          t,
          filesWithSpecificPage
        })
        const tempFileIds = newFiles.map(file => file._id)
        fileIds.push(...tempFileIds)
      }

      await shareFiles(fileIds)

      removeFilesPermanently(client, fileIds).catch(error => {
        log.error(`Error while removing files: ${error}`)
      })

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

      if (fileIds.length > 0) {
        removeFilesPermanently(client, fileIds).catch(error => {
          log.error(`Error while removing files in catch: ${error}`)
        })
      }

      showAlert({
        message: t('ShareBottomSheet.attachmentResponse.error'),
        severity: 'error',
        variant: 'filled'
      })
      onClose()
    }
  }

  return (
    <>
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
