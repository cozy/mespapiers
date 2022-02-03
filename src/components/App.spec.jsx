import React from 'react'
import { render } from '@testing-library/react'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { App } from 'src/components/App'

/* eslint-disable react/display-name */
jest.mock('src/components/Contexts/FormDataProvider', () => ({
  FormDataProvider: ({ children }) => (
    <div data-testid="FormDataProvider">{children}</div>
  )
}))
jest.mock(
  'src/components/StepperDialogWrapper/StepperDialogWrapper',
  () => () => <div data-testid="StepperDialogWrapper" />
)
jest.mock('src/components/AppLayout', () => ({
  AppLayout: ({ children }) => <div data-testid="AppLayout">{children}</div>
}))
jest.mock('src/components/AppRouter', () => ({
  AppRouter: () => <div data-testid="AppRouter" />
}))
jest.mock('src/components/Hooks/useStepperDialog')
jest.mock('src/components/Hooks/usePapersDefinitions')
/* eslint-enable react/display-name */

describe('App', () => {
  it('should contain progressbar when no papers', () => {
    useStepperDialog.mockReturnValue({ isStepperDialogOpen: false })
    usePapersDefinitions.mockReturnValue({ papersDefinitions: [] })

    const { getByRole } = render(<App />)

    expect(getByRole('progressbar')).toBeTruthy()
  })

  it('should return AppRouter component', () => {
    useStepperDialog.mockReturnValue({ isStepperDialogOpen: false })
    usePapersDefinitions.mockReturnValue({ papersDefinitions: ['1', '2'] })

    const { queryByTestId } = render(<App />)

    expect(queryByTestId('AppRouter')).toBeTruthy()
  })

  it('should return FormDataProvider & StepperDialogWrapper component', () => {
    useStepperDialog.mockReturnValue({ isStepperDialogOpen: true })
    usePapersDefinitions.mockReturnValue({ papersDefinitions: [] })

    const { queryByTestId } = render(<App />)

    expect(queryByTestId('FormDataProvider')).toBeTruthy()
    expect(queryByTestId('StepperDialogWrapper')).toBeTruthy()
  })
})
