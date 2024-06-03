import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import ContactDialog from 'src/components/ModelSteps/ContactDialog'
import InformationDialog from 'src/components/ModelSteps/InformationDialog'
import NoteDialog from 'src/components/ModelSteps/NoteDialog'
import ScanWrapper from 'src/components/ModelSteps/Scan/ScanWrapper'
import { handleBack } from 'src/components/StepperDialog/helpers'

import { useWebviewIntent } from 'cozy-intent'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

const StepperDialogWrapper = ({ onClose, onSubmit }) => {
  const { isMobile } = useBreakpoints()
  const webviewIntent = useWebviewIntent()
  const [searchParams] = useSearchParams()
  const {
    allCurrentSteps,
    currentStepIndex,
    previousStep,
    setCurrentStepIndex
  } = useStepperDialog()

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')

  return allCurrentSteps.map((currentStep, idx) => {
    if (idx === currentStepIndex) {
      const modelPage = currentStep.model.toLowerCase()

      const onBack = () => {
        handleBack({
          allCurrentSteps,
          currentStepIndex,
          previousStep,
          setCurrentStepIndex,
          fromFlagshipUpload,
          webviewIntent,
          isMobile,
          onClose
        })
      }

      switch (modelPage) {
        case 'scan':
          return (
            <ScanWrapper
              key={idx}
              currentStep={currentStep}
              onClose={onClose}
              onSubmit={onSubmit}
              onBack={onBack}
            />
          )
        case 'information':
          return (
            <InformationDialog
              key={idx}
              currentStep={currentStep}
              onClose={onClose}
              onSubmit={onSubmit}
              onBack={onBack}
            />
          )
        case 'contact':
          return (
            <ContactDialog
              key={idx}
              currentStep={currentStep}
              onClose={onClose}
              onSubmit={onSubmit}
              onBack={onBack}
            />
          )
        case 'note':
          return (
            <NoteDialog
              key={idx}
              currentStep={currentStep}
              onClose={onClose}
              onSubmit={onSubmit}
              onBack={onBack}
            />
          )
      }
    }
  })
}

export default StepperDialogWrapper
