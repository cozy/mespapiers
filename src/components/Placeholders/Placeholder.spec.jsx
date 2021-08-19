'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import { getBoundT } from 'cozy-scanner'

import AppLike from 'test/components/AppLike'
import Placeholder from 'src/components/Placeholders/Placeholder'
import paperJSON from 'src/constants/papersDefinitions.json'
const papersList = paperJSON.papersDefinitions

jest.mock('cozy-scanner', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))

const setup = (placeholder = papersList[0]) => {
  return render(
    <AppLike>
      <Placeholder placeholder={placeholder} divider={true} />
    </AppLike>
  )
}

describe('Placeholder components:', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display ID card', () => {
    getBoundT.mockReturnValueOnce(() => 'ID card')
    const { getByText } = setup(papersList[0])

    expect(getByText('ID card'))
  })

  it('should display Passeport', () => {
    getBoundT.mockReturnValueOnce(() => 'Passport')
    const { getByText } = setup(papersList[1])

    expect(getByText('Passport'))
  })
})
