'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import Home from 'src/components/Home/Home'

const setup = (hasPapers = false) => {
  return render(
    <AppLike>
      <Home hasPapers={hasPapers} />
    </AppLike>
  )
}

describe('Home components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display Empty text & Placeholder when no data exists', () => {
    const { getByText } = setup()

    expect(getByText('Add your personal documents'))
  })
})
