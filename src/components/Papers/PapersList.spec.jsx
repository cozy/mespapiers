'use strict'
import React from 'react'
import { waitFor, render } from '@testing-library/react'

import { useQuery } from 'cozy-client'

import AppLike from 'test/components/AppLike'
import PapersList from 'src/components/Papers/PapersList'

const mockFiles = {
  data: [
    {
      _id: 'file00',
      name: 'ID card',
      relationships: {
        referenced_by: { data: [{ id: '001', type: 'io.cozy.contacts' }] }
      }
    },
    {
      _id: 'file01',
      name: 'passport',
      relationships: {
        referenced_by: { data: [{ id: '002', type: 'io.cozy.contacts' }] }
      }
    }
  ]
}

jest.mock('cozy-client/dist/hooks/useQuery', () =>
  jest.fn().mockResolvedValue([])
)

const setup = () => {
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
    useQuery.mockReturnValueOnce(mockFiles).mockReturnValueOnce({
      data: [{ _id: '001', fullname: 'Bob' }]
    })
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Bob'))
      expect(getByText('ID card'))
    })
  })

  it('should display "Alice" & "passport"', async () => {
    useQuery.mockReturnValueOnce(mockFiles).mockReturnValueOnce({
      data: [{ _id: '002', fullname: 'Alice' }]
    })
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Alice'))
      expect(getByText('passport'))
    })
  })
})
