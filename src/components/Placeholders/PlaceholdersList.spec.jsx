'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import { getBoundT } from 'cozy-scanner/dist/locales'

import AppLike from 'test/components/AppLike'
import PlaceholdersList from 'src/components/Placeholders/PlaceholdersList'

const fakeQualificationItems = [
  {
    label: 'national_id_card'
  }
]

jest.mock('cozy-scanner/dist/locales', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))

const setup = () => {
  return render(
    <AppLike>
      <PlaceholdersList
        title="passport"
        currentQualifItems={fakeQualificationItems}
        onBack={jest.fn()}
      />
    </AppLike>
  )
}

describe('PlaceholdersList components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display header title with theme', () => {
    getBoundT.mockReturnValueOnce(() => 'Passeport')
    const { getByText } = setup()

    expect(getByText('New paper - Passeport'))
  })
})
