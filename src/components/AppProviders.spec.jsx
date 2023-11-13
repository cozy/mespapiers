import React from 'react'
import { render } from '@testing-library/react'

import { AppProviders } from 'src/components/AppProviders'

/* eslint-disable react/display-name */
jest.mock('cozy-ui/transpiled/react/styles', () => ({
  ...jest.requireActual('cozy-ui/transpiled/react/styles'),
  StylesProvider: ({ children }) => (
    <div data-testid="StylesProvider">{children}</div>
  )
}))
jest.mock('cozy-client', () => ({
  CozyProvider: ({ children }) => (
    <div data-testid="CozyProvider">{children}</div>
  )
}))
jest.mock('cozy-ui/transpiled/react/providers/I18n', () => ({
  I18n: ({ children }) => <div data-testid="I18n">{children}</div>
}))
jest.mock('cozy-ui/transpiled/react/MuiCozyTheme', () => ({ children }) => (
  <div data-testid="MuiCozyTheme">{children}</div>
))
jest.mock('cozy-ui/transpiled/react/providers/Breakpoints', () => ({
  BreakpointsProvider: ({ children }) => (
    <div data-testid="BreakpointsProvider">{children}</div>
  )
}))
jest.mock('cozy-intent', () => ({
  WebviewIntentProvider: ({ children }) => (
    <div data-testid="WebviewIntentProvider">{children}</div>
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
  })
})
