/* eslint-disable jest/no-focused-tests */
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import {
  FormDataProvider,
  useFormData
} from 'src/components/Contexts/FormDataProvider'
import {
  StepperDialogProvider,
  useStepperDialog
} from 'src/components/Contexts/StepperDialogProvider'
import ContactDialog from 'src/components/ModelSteps/ContactDialog'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import AppLike from 'test/components/AppLike'

const mockCurrentStep = { illustration: 'Account.svg', text: 'text of step' }
const mockFormData = ({ metadata = {}, data = [], contacts = [] } = {}) => ({
  metadata,
  data,
  contacts
})

jest.mock('src/components/Contexts/FormDataProvider', () => ({
  ...jest.requireActual('src/components/Contexts/FormDataProvider'),
  useFormData: jest.fn()
}))
jest.mock('src/components/Contexts/StepperDialogProvider', () => ({
  ...jest.requireActual('src/components/Contexts/StepperDialogProvider'),
  useStepperDialog: jest.fn()
}))
jest.mock('src/helpers/fetchCurrentUser', () => ({
  fetchCurrentUser: jest.fn()
}))
// Allow to pass 'isReady' in StepperDialogProvider
jest.mock('src/helpers/findPlaceholders', () => ({
  findPlaceholderByLabelAndCountry: arg => arg
}))
/* eslint-disable react/display-name */
jest.mock('src/components/ModelSteps/widgets/ConfirmReplaceFile', () => () => (
  <div data-testid="ConfirmReplaceFile" />
))
jest.mock('src/components/ModelSteps/widgets/SubmitButton', () => () => (
  <div data-testid="SubmitButton" />
))
/* eslint-enable react/display-name */

const setup = ({
  formData = mockFormData(),
  formSubmit = jest.fn(),
  onClose = jest.fn(),
  mockFetchCurrentUser = jest.fn(),
  isLastStep = jest.fn(() => false)
} = {}) => {
  useStepperDialog.mockReturnValue({
    currentDefinition: {},
    allCurrentSteps: [],
    isLastStep
  })
  fetchCurrentUser.mockImplementation(mockFetchCurrentUser)
  useFormData.mockReturnValue({
    formData,
    setFormData: jest.fn(),
    formSubmit
  })

  return render(
    <AppLike>
      <StepperDialogProvider>
        <FormDataProvider>
          <ContactDialog currentStep={mockCurrentStep} onClose={onClose} />
        </FormDataProvider>
      </StepperDialogProvider>
    </AppLike>
  )
}

describe('ContactDialog', () => {
  it('should have a SubmitButton if is the last step', async () => {
    const { getByTestId } = setup({
      isLastStep: jest.fn(() => true)
    })

    await waitFor(() => {
      expect(getByTestId('SubmitButton')).toBeInTheDocument()
    })
  })

  it('should not have a SubmitButton if is not the last step', async () => {
    const { queryByTestId } = setup({
      isLastStep: jest.fn(() => false)
    })
    await waitFor(() => {
      expect(queryByTestId('SubmitButton')).toBeNull()
    })
  })

  it('should call fetchCurrentUser once at mount', async () => {
    const mockFetchCurrentUser = jest.fn()
    setup({ mockFetchCurrentUser })
    await waitFor(() => {
      expect(mockFetchCurrentUser).toBeCalledTimes(1)
    })
  })
})
