import React, { useState } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import { isMobileApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import AcquisitionResult from 'src/components/ModelPages/AcquisitionResult'

const FileInputAdapter = ({ onChange, schema }) => {
  const { t } = useI18n()
  const [file, setFile] = useState(null)

  const onFileChange = file => {
    if (file) {
      onChange(file)
      setFile(file)
    }
  }

  return file ? (
    <AcquisitionResult file={file} setFile={setFile} />
  ) : (
    <>
      <CompositeHeader icon={schema.illustration} title={t(schema.text)} />
      <DialogActions disableSpacing className={'columnLayout'}>
        <FileInput
          onChange={onFileChange}
          className={'u-w-100 u-ta-center'}
          onClick={e => e.stopPropagation()}
          accept={'image/*,.pdf'}
        >
          <ButtonLink
            subtle
            className={'u-w-100'}
            label={t('FileInputAdapter.alreadyPic')}
          />
        </FileInput>

        {isMobileApp() && (
          <FileInput
            onChange={onFileChange}
            className={'u-w-100 u-ta-center'}
            onClick={e => e.stopPropagation()}
            capture={'environment'}
            accept={'image/*'}
          >
            <ButtonLink
              icon={Camera}
              className={'u-w-100'}
              label={t('FileInputAdapter.takePic')}
            />
          </FileInput>
        )}
      </DialogActions>
    </>
  )
}

export default FileInputAdapter
