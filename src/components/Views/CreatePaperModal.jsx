import React, { useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { useFormData } from 'src/components/Hooks/useFormData'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import {
  getFirstFileFromNative,
  makeFileFromBase64
} from 'src/components/ModelSteps/helpers'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'

import { useWebviewIntent } from 'cozy-intent'
import minilog from 'cozy-minilog'

const log = minilog('CreatePaperModal')

const CreatePaperModal = () => {
  const navigate = useNavigate()
  const { qualificationLabel } = useParams()
  const [searchParams] = useSearchParams()
  const { currentDefinition, allCurrentSteps } = useStepperDialog()
  const webviewIntent = useWebviewIntent()
  const { setFormData } = useFormData()

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')

  const onClose = useCallback(async () => {
    fromFlagshipUpload
      ? await webviewIntent?.call('cancelUploadByCozyApp')
      : navigate('..')
  }, [fromFlagshipUpload, navigate, webviewIntent])

  const onSubmit = () => {
    navigate(`/paper/files/${qualificationLabel}`)
  }

  useEffect(() => {
    const getFileAndSetFormData = async () => {
      try {
        const fileToHandle = await getFirstFileFromNative(webviewIntent)
        const file = makeFileFromBase64(fileToHandle)

        if (file && allCurrentSteps?.length > 0) {
          setFormData(prev => ({
            ...prev,
            data: [
              ...prev.data,
              {
                file,
                stepIndex: 0,
                fileMetadata: {
                  page: 'front'
                }
              }
            ]
          }))
        }
      } catch (error) {
        log.error(
          'An error occured during getFileAndSetFormData setup in CreatePaperModal, the modal will be closed.',
          error
        )

        onClose()
      }
    }

    if (fromFlagshipUpload && webviewIntent) getFileAndSetFormData()
  }, [fromFlagshipUpload, allCurrentSteps, setFormData, webviewIntent, onClose])

  if (!currentDefinition) {
    return null
  }

  return <StepperDialogWrapper onClose={onClose} onSubmit={onSubmit} />
}

const CreatePaperModalWrapper = () => {
  return (
    <StepperDialogProvider>
      <FormDataProvider>
        <CreatePaperModal />
      </FormDataProvider>
    </StepperDialogProvider>
  )
}

export default CreatePaperModalWrapper
