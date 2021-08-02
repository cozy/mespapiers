'use strict'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import Home from 'components/Home/Home'
import { fakeData } from 'components/Home/__mocks__/fakeData'

const setup = (data = []) => {
  return render(
    <AppLike>
      <Home data={data} />
    </AppLike>
  )
}

describe('Home components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display Empty text & Placeholder when no data exists', async () => {
    const { getByText } = setup()

    await waitFor(() => {
      expect(getByText('Add your personal documents'))
      expect(getByText('ID card'))
    })
  })

  it('should display subtitle Existing & Suggestions when all data exists', async () => {
    const { getByText } = setup(fakeData)

    await waitFor(() => {
      expect(getByText('Existing'))
      expect(getByText('Suggestions'))
    })
  })
})
