'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import Home from 'src/components/Home/Home'

const setup = (data = []) => {
  return render(
    <AppLike>
      <Home allPapers={data} />
    </AppLike>
  )
}

describe('Home components:', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display Empty text & Placeholder when no data exists', () => {
    const { getByText } = setup()

    expect(getByText('Add your personal documents'))
    expect(getByText('ID card'))
  })
})
