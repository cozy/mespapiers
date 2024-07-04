import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import ConfirmReplaceFile from 'src/components/ModelSteps/widgets/ConfirmReplaceFile'
import {
  updateMetadata,
  removeIsBlank,
  createPDFBytes
} from 'src/components/ModelSteps/widgets/helpers'
import { FILES_DOCTYPE, KEYS } from 'src/constants'
import { createPdfAndSave } from 'src/helpers/createPdfAndSave'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'

import { useClient } from 'cozy-client'
import { models } from 'cozy-client'
import minilog from 'cozy-minilog'
import Button from 'cozy-ui/transpiled/react/Buttons'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const log = minilog('SubmitButton')

const {
  document: { Qualification }
} = models

const SubmitButton = ({ onSubmit, disabled, formData }) => {
  const [isBusy, setIsBusy] = useState(false)
  const [confirmReplaceFileModal, setConfirmReplaceFileModal] = useState(false)
  const client = useClient()
  const { t, f } = useI18n()
  const scannerT = useScannerI18n()
  const { currentDefinition, stepperDialogTitle } = useStepperDialog()
  const { showAlert } = useAlert()

  const cozyFiles = formData.data.filter(d => d.file.from === 'cozy')
  const blankFiles = formData.data.filter(d => d.file.isBlank)
  const wasInitiallyBlank =
    formData.metadata[FILES_DOCTYPE]?.paperProps?.isBlank ?? false

  const isDisabled = disabled || isBusy

  const submit = async () => {
    setIsBusy(true)
    try {
      const qualification = Qualification.getByLabel(stepperDialogTitle)
      const { _id: appFolderID } = await getOrCreateAppFolderWithReference(
        client,
        t
      )

      await createPdfAndSave({
        formData,
        qualification,
        currentDefinition,
        appFolderID,
        client,
        i18n: { t, f, scannerT }
      })

      showAlert({
        message: t('common.saveFile.success'),
        severity: 'success',
        variant: 'filled'
      })
    } catch (error) {
      log.error('Error when submitting', error)
      showAlert({
        message: t('common.saveFile.error'),
        severity: 'error',
        variant: 'filled'
      })
    } finally {
      onSubmit()
    }
  }

  const handleReplace = async isFileReplaced => {
    if (isFileReplaced) {
      for (const { file } of cozyFiles) {
        await client.destroy({ _id: file.id, _type: FILES_DOCTYPE })
      }
    }
    submit()
  }

  const handleClick = async () => {
    if (cozyFiles.length > 0) {
      return setConfirmReplaceFileModal(true)
    }

    if (wasInitiallyBlank) {
      // if paper was blank
      if (blankFiles.length > 0) {
        // and still blank at the end
        const updatedMetadata = updateMetadata(formData, formData.file)

        await client
          .collection(FILES_DOCTYPE)
          .updateMetadataAttribute(formData.file._id, updatedMetadata)
      } else {
        // but new images are added
        const pdfBytes = await createPDFBytes(formData)
        const updatedMetadata = updateMetadata(formData, formData.file)
        removeIsBlank(updatedMetadata)

        await client.collection(FILES_DOCTYPE).updateFile(pdfBytes, {
          fileId: formData.file._id,
          name: formData.file.name,
          metadata: updatedMetadata
        })
      }

      return onSubmit()
    }

    return submit()
  }

  const handleKeyDown = ({ key }) => {
    if (isDisabled) return
    if (key === KEYS.ENTER) handleClick()
  }

  useEventListener(window, 'keydown', handleKeyDown)

  return (
    <>
      <Button
        fullWidth
        label={t(!isBusy ? 'ContactStep.save' : 'ContactStep.onLoad')}
        onClick={handleClick}
        disabled={isDisabled}
        busy={isBusy}
        data-testid="ButtonSave"
      />
      {confirmReplaceFileModal && (
        <ConfirmReplaceFile
          onClose={() => setConfirmReplaceFileModal(false)}
          onReplace={handleReplace}
          cozyFilesCount={cozyFiles.length}
        />
      )}
    </>
  )
}

SubmitButton.propTypes = {
  formData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default SubmitButton
