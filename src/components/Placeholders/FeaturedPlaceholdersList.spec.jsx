'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import { useQuery, models } from 'cozy-client'
const {
  locales: { getBoundT }
} = models.document

import FeaturedPlaceholdersList from 'src/components/Placeholders/FeaturedPlaceholdersList'

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
        label: 'passport'
      }
    }
  }
]

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())
jest.mock('cozy-client/dist/models/document/locales', () => ({
  getBoundT: jest.fn(() => jest.fn())
}))

const setup = () => {
  return render(
    <AppLike>
      <FeaturedPlaceholdersList />
    </AppLike>
  )
}

describe('FeaturedPlaceholdersList components:', () => {
  it('should be rendered correctly', () => {
    useQuery.mockReturnValue({
      data: []
    })
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should not display Suggestions header', () => {
    useQuery.mockReturnValue({
      data: []
    })
    const { queryByText } = setup()

    expect(queryByText('Suggestions')).toBeNull()
  })

  it('should display Suggestions', () => {
    getBoundT.mockReturnValueOnce(() => 'Others...')
    useQuery.mockReturnValue({
      data: fakePapers
    })
    const { getByText } = setup()

    expect(getByText('Suggestions'))
  })

  it('should display Suggestions & list of placeholder filtered', () => {
    getBoundT.mockReturnValueOnce(() => 'ID card')
    useQuery.mockReturnValue({
      data: [fakePapers[1]]
    })
    const { getByText, getAllByText } = setup()

    expect(getByText('Suggestions'))
    expect(getAllByText('ID card'))
  })
})
