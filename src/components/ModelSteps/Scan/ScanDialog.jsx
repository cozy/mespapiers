import React from 'react'
import IlluGenericNewPage from 'src/assets/icons/IlluGenericNewPage.svg'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import ScanActionsWrapper from 'src/components/ModelSteps/Scan/ScanActions/ScanActionsWrapper'
import StepperDialogTitle from 'src/components/StepperDialog/StepperDialogTitle'

import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ScanDialog = ({
  currentStep,
  onClose,
  onBack,
  onChangeFile,
  onOpenFlagshipScan,
  onOpenFilePickerModal
}) => {
  const { illustration, text } = currentStep
  const { t } = useI18n()
  const { currentStepIndex } = useStepperDialog()

  return (
    <Dialog
      open
      {...(currentStepIndex > 0 && { transitionDuration: 0, onBack })}
      onClose={onClose}
      componentsProps={{
        dialogTitle: {
          className: 'u-flex u-flex-justify-between u-flex-items-center'
        }
      }}
      title={<StepperDialogTitle />}
      content={
        <CompositeHeader
          icon={illustration}
          iconSize="large"
          fallbackIcon={IlluGenericNewPage}
          title={t(text)}
        />
      }
      actions={
        <ScanActionsWrapper
          onChangeFile={onChangeFile}
          onOpenFlagshipScan={onOpenFlagshipScan}
          onOpenFilePickerModal={onOpenFilePickerModal}
        />
      }
      actionsLayout="column"
    />
  )
}

export default ScanDialog
