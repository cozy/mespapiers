import React, { useState } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import FileInput from 'cozy-ui/transpiled/react/FileInput'

import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import AcquisitionResult from 'src/components/ModelSteps/AcquisitionResult'
import GenericScan from 'src/assets/icons/GenericScan.svg'

const Scan = ({ currentStep }) => {
  const { t } = useI18n()
  const { illustration, text } = currentStep
  const [file, setFile] = useState(null)

  const onFileChange = file => file && setFile(file)

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
        fallbackIcon={GenericScan}
        title={t(text)}
      />
      <DialogActions disableSpacing className={'columnLayout'}>
        <FileInput
          onChange={onFileChange}
          className={'u-w-100 u-ta-center'}
          accept={'image/*,.pdf'}
        >
          <ButtonLink
            subtle
            className={'u-w-100'}
            label={t('Scan.useExistingPic')}
          />
        </FileInput>

        <FileInput
          onChange={onFileChange}
          className={'u-w-100 u-ta-center u-mb-half'}
          onClick={e => e.stopPropagation()}
          capture={'environment'}
          accept={'image/*'}
        >
          <ButtonLink
            icon={Camera}
            className={'u-w-100'}
            label={t('Scan.takePic')}
          />
        </FileInput>
      </DialogActions>
    </>
  )
}

export default Scan
