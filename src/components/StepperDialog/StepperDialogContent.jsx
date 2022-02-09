import React from 'react'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import Scan from 'src/components/ModelSteps/Scan'
import Information from 'src/components/ModelSteps/Information'
import Contact from 'src/components/ModelSteps/Contact'

const StepperDialogContent = () => {
  const { allCurrentSteps, currentStepIndex } = useStepperDialog()

  return allCurrentSteps.map(currentStep => {
    if (currentStep.stepIndex === currentStepIndex) {
      const modelPage = currentStep.model.toLowerCase()
      switch (modelPage) {
        case 'scan':
          return <Scan key={currentStep.stepIndex} currentStep={currentStep} />
        case 'information':
          return (
            <Information
              key={currentStep.stepIndex}
              currentStep={currentStep}
            />
          )
        case 'contact':
          return (
            <Contact key={currentStep.stepIndex} currentStep={currentStep} />
          )
      }
    }
  })
}

export default StepperDialogContent
