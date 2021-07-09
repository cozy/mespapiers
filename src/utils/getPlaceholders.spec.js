import { getPlaceholders } from './getPlaceholders'

const fakePapers = [
  {
    metadata: {
      qualification: {
        label: 'national_id_card'
      }
    }
  }
]

describe('getPlaceholders', () => {
  it('should return correct list of placeholders whitout param', () => {
    const placeholders = getPlaceholders()

    expect(placeholders).toHaveLength(1)
  })
  it('should return correct list of placeholders with param', () => {
    const placeholders = getPlaceholders(fakePapers)

    expect(placeholders).toHaveLength(0)
  })
})
