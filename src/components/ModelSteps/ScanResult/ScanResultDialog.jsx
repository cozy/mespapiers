import cx from 'classnames'
import propTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CompositeHeaderImage from 'src/components/CompositeHeader/CompositeHeaderImage'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import OcrProcessingDialog from 'src/components/ModelSteps/ScanResult/OcrProcessingDialog'
import ScanResultCard from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCard'
import ScanResultTitle from 'src/components/ModelSteps/ScanResult/ScanResultTitle'
import { makeFileFromBase64 } from 'src/components/ModelSteps/helpers'
import SubmitButton from 'src/components/ModelSteps/widgets/SubmitButton'
import StepperDialogTitle from 'src/components/StepperDialog/StepperDialogTitle'
import { FLAGSHIP_SCAN_TEMP_FILENAME, KEYS } from 'src/constants'
import { isFlagshipOCRAvailable } from 'src/helpers/isFlagshipOCRAvailable'
import { isSomePaperStepsCompliantWithOCR } from 'src/helpers/isSomePaperStepsCompliantWithOCR'

import { useWebviewIntent } from 'cozy-intent'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import PointerAlert from 'cozy-ui/transpiled/react/PointerAlert'
import { ButtonLink } from 'cozy-ui/transpiled/react/deprecated/Button'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

/**
 * @param {object} props
 * @param {object} props.currentStep
 * @param {Function} props.onClose
 * @param {Function} props.onBack
 * @param {Function} props.onChangeFile
 * @param {Function} props.onSubmit
 * @param {object} props.currentFile
 * @param {Function} props.setCurrentFile
 */
const ScanResultDialog = ({
  currentStep,
  onClose,
  onBack,
  onChangeFile,
  onSubmit,
  currentFile,
  setCurrentFile
}) => {
  const { illustration, multipage, page = 'default', tooltip } = currentStep
  const { t } = useI18n()
  const webviewIntent = useWebviewIntent()
  const [searchParams] = useSearchParams()
  const { isDesktop } = useBreakpoints()

  const device = isDesktop ? 'desktop' : 'mobile'
  const imageRef = useRef(null)
  const [rotationImage, setRotationImage] = useState(0)
  const [ocrProcessing, setOcrProcessing] = useState(false)
  const {
    currentStepIndex,
    nextStep,
    isLastStep,
    allCurrentSteps,
    currentDefinition
  } = useStepperDialog()
  const { formData } = useFormData()

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')
  let currentFileRotated

  const onValid = async addPage => {
    // If the image has changed rotation, the process has changed it to base64, so we need to transform it back into File before saving it in the formData
    if (rotationImage % 360 !== 0) {
      currentFileRotated = makeFileFromBase64({
        source: imageRef.current.src,
        name: currentFile.name,
        type: currentFile.type
      })
      onChangeFile(currentFileRotated, { replace: true })
    }

    if (addPage) {
      setCurrentFile(null)
    } else {
      const isOcrPaperAvailable =
        !fromFlagshipUpload &&
        currentFile.name === FLAGSHIP_SCAN_TEMP_FILENAME && // The file must have been passed through the flagship scanner
        isLastStep('scan') &&
        isSomePaperStepsCompliantWithOCR(allCurrentSteps) &&
        !!currentDefinition.ocrAttributes

      const OcrActivated = await isFlagshipOCRAvailable(webviewIntent)
      if (isOcrPaperAvailable && OcrActivated) {
        setOcrProcessing(true)
      } else {
        nextStep()
      }
    }
  }

  const handleNextStep = async () => await onValid(false)
  const handleRepeatStep = async () => await onValid(true)

  const handleKeyDown = ({ key }) => {
    if (key === KEYS.ENTER) handleNextStep()
  }

  useEventListener(window, 'keydown', handleKeyDown)

  if (ocrProcessing) {
    return (
      <OcrProcessingDialog rotatedFile={currentFileRotated} onBack={onBack} />
    )
  }
  const SubmitButtonComponent = isLastStep() ? SubmitButton : null

  return (
    <FixedDialog
      open
      {...(currentStepIndex > 0 && { onBack })}
      transitionDuration={0}
      onClose={onClose}
      componentsProps={{
        dialogTitle: {
          className: 'u-flex u-flex-justify-between u-flex-items-center'
        }
      }}
      title={<StepperDialogTitle />}
      content={
        <div className={cx('u-flex u-flex-column u-flex-justify-center')}>
          {!formData.data?.[0]?.file?.isBlank && (
            <>
              <ScanResultTitle />
              {tooltip && (
                <PointerAlert
                  className="u-mb-1"
                  icon={
                    <CompositeHeaderImage
                      icon={illustration}
                      iconSize="small"
                    />
                  }
                >
                  {t(`Acquisition.${device}.tooltip.${page}`)}
                </PointerAlert>
              )}
            </>
          )}
          <ScanResultCard
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            rotationImage={rotationImage}
            setRotationImage={setRotationImage}
            ref={imageRef}
          />
        </div>
      }
      actions={
        <>
          {SubmitButtonComponent ? (
            <SubmitButtonComponent formData={formData} onSubmit={onSubmit} />
          ) : (
            <Button
              data-testid="next-button"
              fullWidth
              label={t('common.next')}
              onClick={handleNextStep}
            />
          )}
          {multipage && (
            <ButtonLink
              className="u-ml-0 u-mb-half"
              data-testid="repeat-button"
              extension="full"
              theme="secondary"
              icon="camera"
              label={t('Acquisition.repeat')}
              onClick={handleRepeatStep}
            />
          )}
        </>
      }
      actionsLayout="column"
    />
  )
}

ScanResultDialog.propTypes = {
  currentStep: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
  onBack: propTypes.func.isRequired,
  onChangeFile: propTypes.func.isRequired,
  currentFile: propTypes.object.isRequired,
  setCurrentFile: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired
}

export default ScanResultDialog
