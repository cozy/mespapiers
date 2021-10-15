'use strict'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { isQueryLoading } from 'cozy-client'

import AppLike from 'test/components/AppLike'
import HomeWrapper from 'src/components/HomeWrapper/HomeWrapper'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn()
}))
jest.mock('cozy-client/dist/hooks/useQuery', () => {
  return jest.fn(() => ({ data: [] }))
})
jest.mock('cozy-client/dist/utils', () => ({
  ...jest.requireActual('cozy-client/dist/utils'),
  isQueryLoading: jest.fn()
}))

const setup = (isLoading = true) => {
  isQueryLoading.mockReturnValue(isLoading)
  return render(
    <AppLike>
      <HomeWrapper />
    </AppLike>
  )
}

describe('HomeWrapper components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display Spinner when all data are not loaded', async () => {
    const { container } = setup(true)

    await waitFor(() => {
      expect(container.querySelector('[role="progressbar"]')).toBeDefined()
    })
  })

  it('should not display Spinner when all data are loaded', async () => {
    const { container } = setup(false)

    await waitFor(() => {
      expect(container.querySelector('[role="progressbar"]')).toBeNull()
    })
  })
})
