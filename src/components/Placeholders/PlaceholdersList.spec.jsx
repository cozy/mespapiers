'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import AppLike from 'test/components/AppLike'
import { useQuery } from 'cozy-client'
import { getBoundT } from 'cozy-scanner'

import PlaceholdersList from 'src/components/Placeholders/PlaceholdersList'

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

const setup = () => {
  return render(
    <AppLike>
      <PlaceholdersList />
    </AppLike>
  )
}

describe('PlaceholdersList components:', () => {
  it('should be rendered correctly', () => {
    useQuery.mockReturnValueOnce({
      data: []
    })
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should not display Suggestions header', () => {
    useQuery.mockReturnValueOnce({
      data: []
    })
    const { queryByText } = setup()

    expect(queryByText('Suggestions')).toBeNull()
  })

  it('should display Suggestions', () => {
    getBoundT.mockReturnValueOnce(() => 'Others...')
    useQuery.mockReturnValueOnce({
      data: fakePapers
    })
    const { getByText } = setup()

    expect(getByText('Suggestions'))
  })

  it('should display Suggestions & list of placeholder filtered', () => {
    getBoundT.mockReturnValueOnce(() => 'ID card')
    useQuery.mockReturnValueOnce({
      data: [fakePapers[1]]
    })
    const { getByText, getAllByText } = setup()

    expect(getByText('Suggestions'))
    expect(getAllByText('ID card'))
  })
})
