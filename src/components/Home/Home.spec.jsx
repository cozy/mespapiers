'use strict'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { isQueryLoading } from 'cozy-client'

import AppLike from '../../../test/components/AppLike'
import Home from '.'

jest.mock('cozy-client/dist/hooks/useQuery', () =>
  jest.fn(() => ({
    data: [{ name: 'File01' }]
  }))
)
jest.mock('cozy-client/dist/utils', () => ({
  ...jest.requireActual('cozy-client/dist/utils'),
  isQueryLoading: jest.fn()
}))

const setup = (isLoading = true) => {
  isQueryLoading.mockReturnValue(isLoading)
  return render(
    <AppLike>
      <Home />
    </AppLike>
  )
}

describe('Home components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display Spinner & Suggestions when all data are not loaded', async () => {
    const { container, getByText } = setup(true)

    await waitFor(() => {
      expect(container.querySelector('[role="progressbar"]')).toBeDefined()
      expect(getByText('Suggestions'))
    })
  })

  it('should display Existing data & Suggestions when all data are loaded', async () => {
    const { getByText } = setup(false)

    await waitFor(() => {
      expect(getByText('Existing'))
      expect(getByText('Suggestions'))
    })
  })
})
