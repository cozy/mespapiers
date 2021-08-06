'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import { useQuery } from 'cozy-client'

import AppLike from 'test/components/AppLike'
import PapersList from 'src/components/Papers/PapersList'

const fakeData = [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

const setup = () => {
  return render(
    <AppLike>
      <PapersList />
    </AppLike>
  )
}

describe('PapersList components:', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be rendered correctly', () => {
    useQuery.mockReturnValueOnce({
      data: []
    })
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display "ID card" & "Passport"', () => {
    useQuery.mockReturnValueOnce({
      data: fakeData
    })
    const { getByText } = setup()

    expect(getByText('ID card'))
    expect(getByText('Passport'))
  })
})
