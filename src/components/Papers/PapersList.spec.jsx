'use strict'
import React from 'react'
import { waitFor, render } from '@testing-library/react'

import { useQuery as useQueryCozy } from 'cozy-client'

import AppLike from 'test/components/AppLike'
import PapersList from 'src/components/Papers/PapersList'

const fakeData = {
  data: [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]
}

jest.mock('cozy-client/dist/hooks/useQuery', () =>
  jest.fn(() => ({ data: [] }))
)
jest.mock('cozy-scanner', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))

const setup = () => {
  return render(
    <AppLike>
      <PapersList />
    </AppLike>
  )
}

describe('PapersList components:', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be rendered correctly', async () => {
    const { container } = setup()

    await waitFor(() => {
      expect(container).toBeDefined()
    })
  })

  it('should display "ID card" & "Passport"', async () => {
    useQueryCozy.mockReturnValueOnce(fakeData)
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('ID card'))
      expect(getByText('Passport'))
    })
  })
})
