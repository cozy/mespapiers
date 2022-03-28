import React from 'react'
import { render } from '@testing-library/react'

import { App } from 'src/components/App'
import AppLike from 'test/components/AppLike'

/* eslint-disable react/display-name */
jest.mock('src/indexLib', () => () => <div data-testid="indexLib" />)
jest.mock('cozy-ui/transpiled/react/Layout', () => ({
  Layout: ({ children }) => <div data-testid="Layout">{children}</div>,
  Main: ({ children }) => <div data-testid="Main">{children}</div>,
  Content: ({ children }) => <div data-testid="Content">{children}</div>
}))
jest.mock('cozy-ui/transpiled/react/Icon/Sprite', () => () => (
  <div data-testid="Sprite" />
))
/* eslint-enable react/display-name */

describe('App', () => {
  it('should contain Layout, Main, Content & Sprite components', () => {
    const { queryByTestId } = render(
      <AppLike>
        <App />
      </AppLike>
    )

    expect(queryByTestId('Layout')).toBeTruthy()
    expect(queryByTestId('Main')).toBeTruthy()
    expect(queryByTestId('Content')).toBeTruthy()
    expect(queryByTestId('Sprite')).toBeTruthy()
  })
})
