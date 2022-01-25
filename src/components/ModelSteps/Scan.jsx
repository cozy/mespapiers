import React, { useState, useRef, useEffect } from 'react'

import { useClient, models } from 'cozy-client'
import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FolderMoveto from 'cozy-ui/transpiled/react/Icons/FolderMoveto'
import PhoneUpload from 'cozy-ui/transpiled/react/Icons/PhoneUpload'
import FilePicker from 'cozy-ui/transpiled/react/FilePicker'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import AcquisitionResult from 'src/components/ModelSteps/AcquisitionResult'
import IlluGenericNewPage from 'src/assets/icons/IlluGenericNewPage.svg'

const { fetchBlobFileById } = models.file

// TODO Waiting for this type of filter to be implemented on the FilePicker side
// https://github.com/cozy/cozy-ui/issues/2026
const validFileType = file => {
  const regexValidation = /(image\/*)|(application\/pdf)/
  return regexValidation.test(file.type)
}

const Scan = ({ currentStep }) => {
  const { t } = useI18n()
  const client = useClient()
  const { illustration, text } = currentStep
  const [file, setFile] = useState(null)
  const actionBtnRef = useRef()
  const { alreadyScan } = useStepperDialog()

  const [isFilePickerModalOpen, setIsFilePickerModalOpen] = useState(false)
  const [fileId, setFileId] = useState('')
  const [isImportFileModalOpen, setIsImportFileModalOpen] = useState(false)

  const closeImportFileModal = () => setIsImportFileModalOpen(false)

  const onClickExistingFileBtn = () => {
    setIsImportFileModalOpen(true)
  }

  const onFileChange = file => {
    if (file) {
      setFile(file)
      setIsImportFileModalOpen(false)
    }
  }

  const openFilePickerModal = () => {
    setIsFilePickerModalOpen(true)
  }
  const closeFilePickerModal = () => setIsFilePickerModalOpen(false)

  const onChangeFilePicker = fileId => {
    setFileId(fileId)
  }

  useEffect(() => {
    ;(async () => {
      if (fileId) {
        const blobFile = await fetchBlobFileById(client, fileId)
        if (validFileType(blobFile)) {
          setFile(blobFile)
        } else {
          Alerter.error('Scan.modal.validFileType', {
            duration: 3000
          })
        }
      }
    })()
  }, [client, fileId])

  return file ? (
    <AcquisitionResult
      file={file}
      setFile={setFile}
      currentStep={currentStep}
    />
  ) : (
    <>
      <CompositeHeader
        icon={illustration}
        iconSize={'large'}
        fallbackIcon={IlluGenericNewPage}
        title={t(text)}
      />
      <DialogActions
        disableSpacing
        className={'columnLayout u-mh-0 u-mb-1 cozyDialogActions'}
      >
        {!alreadyScan ? (
          <>
            <ButtonLink
              subtle
              onClick={onClickExistingFileBtn}
              className={'u-w-100'}
              label={t('Scan.useExistingPic')}
            />
            <FileInput
              onChange={onFileChange}
              className={'u-w-100 u-ta-center u-mb-half u-ml-0'}
              onClick={e => e.stopPropagation()}
              capture={'environment'}
              accept={'image/*'}
            >
              <ButtonLink
                icon={Camera}
                className={'u-w-100 u-m-0'}
                label={t('Scan.takePic')}
              />
            </FileInput>
          </>
        ) : (
          <>
            <FileInput
              onChange={onFileChange}
              className={'u-w-100 u-ta-center'}
              onClick={e => e.stopPropagation()}
              capture={'environment'}
              accept={'image/*'}
            >
              <ButtonLink
                subtle
                icon={Camera}
                className={'u-w-100'}
                label={t('Scan.takePic')}
              />
            </FileInput>
            <ButtonLink
              className={'u-w-100 u-m-0'}
              label={t('Scan.selectPic')}
              onClick={onClickExistingFileBtn}
            />
          </>
        )}
      </DialogActions>

      {isImportFileModalOpen && (
        <ActionMenu onClose={closeImportFileModal} anchorElRef={actionBtnRef}>
          <List>
            <ListItem onClick={openFilePickerModal}>
              <ListItemIcon>
                <Icon icon={FolderMoveto} size={16} />
              </ListItemIcon>
              <Typography variant="body1">
                {t('Scan.modal.cozySelect')}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon icon={PhoneUpload} size={16} />
              </ListItemIcon>
              <FileInput
                onChange={onFileChange}
                className={'u-w-100 u-mb-half u-ml-0'}
                onClick={e => e.stopPropagation()}
                accept={'image/*,.pdf'}
              >
                <Typography
                  variant="body1"
                  className={'u-p-0'}
                  onClick={e => e.stopPropagation()}
                >
                  {t('Scan.modal.deviceSelect')}
                </Typography>
              </FileInput>
            </ListItem>
          </List>
        </ActionMenu>
      )}

      {isFilePickerModalOpen && (
        <FilePicker
          onChange={onChangeFilePicker}
          onClose={closeFilePickerModal}
        />
      )}
    </>
  )
}

export default Scan
