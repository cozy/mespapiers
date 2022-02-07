import React, { useState, useEffect, memo, useCallback } from 'react'

import { useClient, models } from 'cozy-client'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import { Button, ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import FolderMoveto from 'cozy-ui/transpiled/react/Icons/FolderMoveto'
import PhoneUpload from 'cozy-ui/transpiled/react/Icons/PhoneUpload'
import FilePicker from 'cozy-ui/transpiled/react/FilePicker'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import AcquisitionResult from 'src/components/ModelSteps/AcquisitionResult'
import IlluGenericNewPage from 'src/assets/icons/IlluGenericNewPage.svg'
import { makeBlobWithCustomAttrs } from 'src/helpers/makeBlobWithCustomAttrs'

const { fetchBlobFileById } = models.file

// TODO Waiting for this type of filter to be implemented on the FilePicker side
// https://github.com/cozy/cozy-ui/issues/2026
const validFileType = file => {
  const regexValidation = /(image\/*)|(application\/pdf)/
  return regexValidation.test(file.type)
}

const styleBtn = { color: 'var(--primaryTextColor)' }

const Scan = ({ currentStep }) => {
  const { t } = useI18n()
  const client = useClient()
  const { illustration, text } = currentStep
  const [file, setFile] = useState(null)

  const [isFilePickerModalOpen, setIsFilePickerModalOpen] = useState(false)
  const [cozyFileId, setCozyFileId] = useState('')

  const onChangeFile = useCallback(file => {
    if (file) {
      setFile(file)
    }
  }, [])

  const openFilePickerModal = () => {
    setIsFilePickerModalOpen(true)
  }
  const closeFilePickerModal = () => setIsFilePickerModalOpen(false)

  const onChangeFilePicker = fileId => {
    setCozyFileId(fileId)
  }

  useEffect(() => {
    ;(async () => {
      if (cozyFileId) {
        const blobFile = await fetchBlobFileById(client, cozyFileId)
        if (validFileType(blobFile)) {
          const blobFileCustom = makeBlobWithCustomAttrs(blobFile, {
            id: cozyFileId
          })
          onChangeFile(blobFileCustom)
        } else {
          Alerter.error('Scan.modal.validFileType', {
            duration: 3000
          })
        }
      }
    })()
  }, [client, cozyFileId, onChangeFile])

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
        <div>
          <Divider textAlign="center" className={'u-mv-1'}>
            {t('Scan.divider')}
          </Divider>
          <Button
            theme="secondary"
            style={styleBtn}
            onClick={openFilePickerModal}
            icon={FolderMoveto}
            className={'u-w-100'}
            label={t('Scan.selectPicFromCozy')}
          />
          <FileInput
            onChange={onChangeFile}
            className={'u-w-100 u-ml-0'}
            onClick={e => e.stopPropagation()}
            accept={'image/*,.pdf'}
          >
            <ButtonLink
              theme={'secondary'}
              style={styleBtn}
              icon={PhoneUpload}
              className={'u-w-100 u-m-0'}
              label={t('Scan.importPic')}
            />
          </FileInput>
        </div>
        <FileInput
          onChange={onChangeFile}
          className={'u-w-100 u-ta-center u-ml-0'}
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
      </DialogActions>

      {isFilePickerModalOpen && (
        <FilePicker
          onChange={onChangeFilePicker}
          onClose={closeFilePickerModal}
        />
      )}
    </>
  )
}

export default memo(Scan)
