'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import People from 'cozy-ui/transpiled/react/Icons/People'

import AppLike from 'test/components/AppLike'
import ImportDropdown from 'components/ImportDropdown/ImportDropdown'

const setup = (label = 'national_id_card') => {
  return render(
    <AppLike>
      <ImportDropdown label={label} icon={People} />
    </AppLike>
  )
}

describe('ImportDropdown components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should display correct menu for ID card', () => {
    const { getByText } = setup('national_id_card')

    expect(getByText('ID card'))
    expect(getByText('Auto import'))
    expect(getByText('Take a picture'))
  })

  it('should display correct menu for Passeport', () => {
    const { getByText } = setup('passport')

    expect(getByText('Passeport'))
    expect(getByText('Auto import'))
    expect(getByText('Take a picture'))
  })
})
