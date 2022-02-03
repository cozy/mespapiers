import React from 'react'
import { render } from '@testing-library/react'

import { AppProviders } from 'src/components/AppProviders'

/* eslint-disable react/display-name */
jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  StylesProvider: ({ children }) => (
    <div data-testid="StylesProvider">{children}</div>
  )
}))
jest.mock('cozy-client', () => ({
  CozyProvider: ({ children }) => (
    <div data-testid="CozyProvider">{children}</div>
  )
}))
jest.mock('cozy-ui/transpiled/react/I18n', () => ({
  I18n: ({ children }) => <div data-testid="I18n">{children}</div>
}))
jest.mock('cozy-ui/transpiled/react/MuiCozyTheme', () => ({ children }) => (
  <div data-testid="MuiCozyTheme">{children}</div>
))
jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints', () => ({
  BreakpointsProvider: ({ children }) => (
    <div data-testid="BreakpointsProvider">{children}</div>
  )
}))
jest.mock('cozy-intent', () => ({
  WebviewIntentProvider: ({ children }) => (
    <div data-testid="WebviewIntentProvider">{children}</div>
  )
}))

jest.mock('src/components/Contexts/ScannerI18nProvider', () => ({
  ScannerI18nProvider: ({ children }) => (
    <div data-testid="ScannerI18nProvider">{children}</div>
  )
}))
jest.mock('src/components/Contexts/PapersDefinitionsProvider', () => ({
  PapersDefinitionsProvider: ({ children }) => (
    <div data-testid="PapersDefinitionsProvider">{children}</div>
  )
}))
jest.mock('src/components/Contexts/StepperDialogProvider', () => ({
  StepperDialogProvider: ({ children }) => (
    <div data-testid="StepperDialogProvider">{children}</div>
  )
}))
jest.mock('src/components/Contexts/PlaceholderModalProvider', () => ({
  PlaceholderModalProvider: ({ children }) => (
    <div data-testid="PlaceholderModalProvider">{children}</div>
  )
}))
jest.mock('src/components/Contexts/ModalProvider', () => ({
  ModalProvider: ({ children }) => (
    <div data-testid="ModalProvider">{children}</div>
  )
}))
/* eslint-enable react/display-name */

describe('AppProviders', () => {
  it('should contain all providers', () => {
    const { queryByTestId } = render(<AppProviders />)

    expect(queryByTestId('StylesProvider')).toBeTruthy()
    expect(queryByTestId('CozyProvider')).toBeTruthy()
    expect(queryByTestId('I18n')).toBeTruthy()
    expect(queryByTestId('MuiCozyTheme')).toBeTruthy()
    expect(queryByTestId('BreakpointsProvider')).toBeTruthy()
    expect(queryByTestId('WebviewIntentProvider')).toBeTruthy()

    expect(queryByTestId('ScannerI18nProvider')).toBeTruthy()
    expect(queryByTestId('PapersDefinitionsProvider')).toBeTruthy()
    expect(queryByTestId('StepperDialogProvider')).toBeTruthy()
    expect(queryByTestId('PlaceholderModalProvider')).toBeTruthy()
    expect(queryByTestId('ModalProvider')).toBeTruthy()
  })
})
