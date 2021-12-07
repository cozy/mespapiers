'use strict'
import React from 'react'
import { waitFor, render } from '@testing-library/react'

import { useQuery, isQueryLoading } from 'cozy-client'

import AppLike from 'test/components/AppLike'
import PapersList from 'src/components/Papers/PapersList'

jest.mock('cozy-client/dist/hooks/useQuery', () =>
  jest.fn().mockResolvedValue([])
)
jest.mock('cozy-client/dist/utils', () => ({
  ...jest.requireActual('cozy-client/dist/utils'),
  isQueryLoading: jest.fn()
}))

const setup = () => {
  isQueryLoading.mockReturnValue(false)
  return render(
    <AppLike>
      <PapersList />
    </AppLike>
  )
}

describe('PapersList components:', () => {
  it('should be rendered correctly', async () => {
    const { container } = setup()

    await waitFor(() => {
      expect(container).toBeDefined()
    })
  })

  it('should display "Bob" & "ID card"', async () => {
    useQuery.mockReturnValue({
      data: [
        {
          _id: 'file01',
          name: 'ID card',
          relationships: {
            referenced_by: { data: [{ id: '001', type: 'io.cozy.contacts' }] }
          }
        },
        { _id: '001', displayName: 'Bob' }
      ],
      lastUpdate: true,
      fetchMore: jest.fn(),
      hasMore: false
    })
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Bob'))
      expect(getByText('ID card'))
    })
  })

  it('should display "Alice" & "passport"', async () => {
    useQuery.mockReturnValue({
      data: [
        {
          _id: 'file02',
          name: 'passport',
          relationships: {
            referenced_by: { data: [{ id: '002', type: 'io.cozy.contacts' }] }
          }
        },
        { _id: '002', displayName: 'Alice' }
      ],
      lastUpdate: true,
      fetchMore: jest.fn(),
      hasMore: false
    })
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Alice'))
      expect(getByText('passport'))
    })
  })
})
