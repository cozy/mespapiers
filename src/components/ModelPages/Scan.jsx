import React, { useState } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import FileInput from 'cozy-ui/transpiled/react/FileInput'
import { isMobileApp } from 'cozy-device-helper'

import ID from 'assets/icons/Identity.svg'

import { useStepperDialogContext } from '../Hooks/useStepperDialogContext'
import CompositeHeader from '../CompositeHeader/CompositeHeader'

const Scan = ({ currentPage }) => {
  const { t } = useI18n()
  const { nextPage } = useStepperDialogContext()
  const { occurrence } = currentPage
  const [currentOccurrence, setCurrentOccurrence] = useState(1)

  const onFileChange = file => {
    if (file) {
      // Set CreatePaperProvider
      if (currentOccurrence === occurrence) return nextPage()

      setCurrentOccurrence(prev => prev + 1)
    }
  }

  return (
    <>
      <CompositeHeader icon={ID} title={t(currentPage.text)} />
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
            label={"J'ai déjà une photo"}
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
              label={'Prendre en photo'}
            />
          </FileInput>
        )}
      </DialogActions>
    </>
  )
}

export default Scan
