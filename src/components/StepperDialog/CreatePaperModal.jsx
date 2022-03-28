import React from 'react'

import { FormDataProvider } from '../Contexts/FormDataProvider'
import StepperDialogWrapper from './StepperDialogWrapper'

const CreatePaperModal = ({ onClose }) => {
  return (
    <FormDataProvider>
      <StepperDialogWrapper onClose={onClose} />
    </FormDataProvider>
  )
}

export default CreatePaperModal
