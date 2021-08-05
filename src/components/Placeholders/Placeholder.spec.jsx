'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import Placeholder from 'src/components/Placeholders/Placeholder'
import paperJSON from 'src/constants/papersDefinitions.json'
const papersList = paperJSON.papersDefinitions

const setup = (placeholder = papersList[0]) => {
  return render(
    <AppLike>
      <Placeholder placeholder={placeholder} divider={true} />
    </AppLike>
  )
}

describe('Placeholder components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display ID card', () => {
    const { getByText } = setup(papersList[0])

    expect(getByText('ID card'))
  })

  it('should display Passeport', () => {
    const { getByText } = setup(papersList[1])

    expect(getByText('Passeport'))
  })
})
