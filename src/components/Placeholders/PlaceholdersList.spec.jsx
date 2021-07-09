'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from '../../../test/components/AppLike'
import PlaceholdersList from './PlaceholdersList'

const fakePapers = [
  {
    metadata: {
      qualification: {
        label: 'national_id_card'
      }
    }
  },
  {
    metadata: {
      qualification: {
        label: 'Passport'
      }
    }
  }
]

const setup = (papers = fakePapers) => {
  return render(
    <AppLike>
      <PlaceholdersList papers={papers} />
    </AppLike>
  )
}

describe('PlaceholdersList components:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should not display Suggestions header', () => {
    const { queryByText } = setup([])

    expect(queryByText('Suggestions')).toBeNull()
  })

  it('should display Suggestions', () => {
    const { getByText } = setup()

    expect(getByText('Suggestions'))
  })

  it('should display Suggestions & list of placeholder filtered', () => {
    const { getByText } = setup([fakePapers[1]])

    expect(getByText('Suggestions'))
    expect(getByText('ID card'))
  })
})
