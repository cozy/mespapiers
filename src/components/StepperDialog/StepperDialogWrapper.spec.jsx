import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import AppLike from 'test/components/AppLike'

/* eslint-disable react/display-name */
jest.mock('../ModelSteps/Scan/ScanWrapper', () => () => (
  <div data-testid="ScanWrapper" />
))
jest.mock('../ModelSteps/InformationDialog', () => () => (
  <div data-testid="InformationDialog" />
))
jest.mock('../ModelSteps/ContactDialog', () => () => (
  <div data-testid="ContactDialog" />
))
jest.mock('src/components/Contexts/StepperDialogProvider', () => ({
  ...jest.requireActual('src/components/Contexts/StepperDialogProvider'),
  useStepperDialog: jest.fn()
}))
/* eslint-enable react/display-name */

const mockAllCurrentSteps = [
  { model: 'scan' },
  { model: 'information' },
  { model: 'contact' }
]

describe('StepperDialogWrapper', () => {
  const setup = ({
    allCurrentSteps = mockAllCurrentSteps,
    currentStepIndex
  }) => {
    useStepperDialog.mockReturnValue({
      allCurrentSteps,
      currentStepIndex
    })

    return render(
      <AppLike>
        <StepperDialogWrapper />
      </AppLike>
    )
  }

  it('should contain only Scan component', () => {
    const { getByTestId, queryByTestId } = setup({
      currentStepIndex: 0
    })

    expect(getByTestId('ScanWrapper')).toBeInTheDocument()
    expect(queryByTestId('InformationDialog')).toBeNull()
    expect(queryByTestId('ContactDialog')).toBeNull()
  })

  it('should contain only InformationDialog component', () => {
    const { getByTestId, queryByTestId } = setup({
      currentStepIndex: 1
    })

    expect(getByTestId('InformationDialog')).toBeInTheDocument()
    expect(queryByTestId('ScanWrapper')).toBeNull()
    expect(queryByTestId('ContactDialog')).toBeNull()
  })

  it('should contain only Contact component', () => {
    const { getByTestId, queryByTestId } = setup({
      currentStepIndex: 2
    })

    expect(getByTestId('ContactDialog')).toBeInTheDocument()
    expect(queryByTestId('ScanWrapper')).toBeNull()
    expect(queryByTestId('InformationDialog')).toBeNull()
  })
})
