import React from 'react'
import { render } from '@testing-library/react'

import flag from 'cozy-flags'

import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { AppLayout } from 'src/components/AppLayout'
import AppLike from 'test/components/AppLike'

/* eslint-disable react/display-name */
jest.mock('cozy-ui/transpiled/react/Icon/Sprite', () => () => (
  <div data-testid="Sprite" />
))
jest.mock('cozy-ui/transpiled/react/MuiCozyTheme', () => () => (
  <div data-testid="MuiCozyTheme" />
))
jest.mock('cozy-ui/transpiled/react/Alerter', () => () => (
  <div data-testid="Alerter" />
))
jest.mock('cozy-ui/transpiled/react/Layout', () => ({
  Layout: ({ children }) => <div data-testid="Layout">{children}</div>,
  Main: ({ children }) => <div data-testid="Main">{children}</div>,
  Content: ({ children }) => <div data-testid="Content">{children}</div>
}))
jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  RealTimeQueries: () => <div data-testid="RealTimeQueries" />
}))

jest.mock('src/components/Contexts/ModalProvider', () => ({
  ...jest.requireActual('src/components/Contexts/ModalProvider'),
  ModalStack: () => <div data-testid="ModalStack" />
}))
jest.mock('src/components/Hooks/usePapersDefinitions')

jest.mock('cozy-flags')
jest.mock('cozy-flags/dist/FlagSwitcher', () => () => (
  <div data-testid="FlagSwitcher" />
))
/* eslint-enable react/display-name */

const setup = ({
  isFlag = false,
  customPaperLoaded = false,
  customPaperName = ''
} = {}) => {
  flag.mockReturnValue(isFlag)
  usePapersDefinitions.mockReturnValue({
    customPapersDefinitions: {
      isLoaded: customPaperLoaded,
      name: customPaperName
    }
  })

  return render(
    <AppLike>
      <AppLayout />
    </AppLike>
  )
}

describe('AppLayout', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should contain FlagSwitcher when flag "switcher" is activate', () => {
    const { queryByTestId } = setup({ isFlag: true })

    expect(queryByTestId('FlagSwitcher')).toBeTruthy()
  })

  it('should contain "custom name" text if custom papersDefinitions file is used', () => {
    const { queryByText } = setup({
      customPaperLoaded: true,
      customPaperName: 'custom name'
    })

    expect(
      queryByText('File "custom name" loaded from your Drive')
    ).toBeTruthy()
  })

  it('should contain Layout, Main, Content, RealTimeQueries(2), Alerter, ModalStack & Sprite components', () => {
    const { queryByTestId, queryAllByTestId } = setup()

    expect(queryByTestId('Layout')).toBeTruthy()
    expect(queryByTestId('Main')).toBeTruthy()
    expect(queryByTestId('Content')).toBeTruthy()
    expect(queryAllByTestId('RealTimeQueries')).toHaveLength(2)
    expect(queryByTestId('Alerter')).toBeTruthy()
    expect(queryByTestId('ModalStack')).toBeTruthy()
    expect(queryByTestId('Sprite')).toBeTruthy()
  })
})
