import React from 'react'
import { render } from '@testing-library/react'

import { AppRouter } from 'src/components/AppRouter'

/* eslint-disable react/display-name */
jest.mock('src/components/OnboardedGuardedRoute', () => ({ component }) => (
  <div data-testid="OnboardedGuardedRoute">{component()}</div>
))
jest.mock('src/components/Home/Home', () => () => <div data-testid="Home" />)
jest.mock('src/components/Onboarding/Onboarding', () => () => (
  <div data-testid="Onboarding" />
))
jest.mock('src/components/Papers/PapersListWrapper', () => () => (
  <div data-testid="PapersListWrapper" />
))
jest.mock('src/components/Viewer/FileViewerWithQuery', () => () => (
  <div data-testid="FileViewerWithQuery" />
))
jest.mock('react-router-dom', () => ({
  HashRouter: ({ children }) => <div data-testid="HashRouter">{children}</div>,
  Redirect: ({ children }) => <div data-testid="Redirect">{children}</div>,
  Switch: ({ children }) => <div data-testid="Switch">{children}</div>
}))
/* eslint-enable react/display-name */

describe('AppRouter', () => {
  it('should render home, onboarding, papersListWrapper, fileViewerWithQuery components', () => {
    const { queryByTestId } = render(<AppRouter />)

    expect(queryByTestId('Home')).toBeTruthy()
    expect(queryByTestId('Onboarding')).toBeTruthy()
    expect(queryByTestId('PapersListWrapper')).toBeTruthy()
    expect(queryByTestId('FileViewerWithQuery')).toBeTruthy()
  })
})
