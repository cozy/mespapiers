'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import { getBoundT } from 'cozy-scanner/dist/locales'

import PaperLine from 'src/components/Papers/PaperLine'

const mockPapers = [
  { id: '00', name: 'ID card' },
  { id: '01', name: 'Passport' }
]

const setup = (paper = mockPapers[0]) => {
  return render(
    <AppLike>
      <PaperLine paper={paper} divider={true} />
    </AppLike>
  )
}

describe('PaperLine components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display "ID card"', () => {
    getBoundT.mockReturnValueOnce(() => 'ID card')
    const { getByText } = setup(mockPapers[0])

    expect(getByText('ID card'))
  })

  it('should display "Passport"', () => {
    getBoundT.mockReturnValueOnce(() => 'Passport')
    const { getByText } = setup(mockPapers[1])

    expect(getByText('Passport'))
  })
})
