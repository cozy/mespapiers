import {
  getFeaturedPlaceholders,
  findPlaceholdersByQualification
} from 'src/helpers/findPlaceholders'

const fakePapers = [
  {
    metadata: {
      qualification: {
        label: 'national_id_card'
      }
    }
  }
]
const fakeQualificationItems = [
  {
    label: 'national_id_card'
  }
]

describe('getPlaceholders', () => {
  describe('getFeaturedPlaceholders', () => {
    it('should return correct list of placeholders whitout param', () => {
      const featuredPlaceholders = getFeaturedPlaceholders()

      expect(featuredPlaceholders).toHaveLength(8)
    })

    it('should return correct list of placeholders with param', () => {
      const featuredPlaceholders = getFeaturedPlaceholders(fakePapers)

      expect(featuredPlaceholders).toHaveLength(7)
    })
  })

  describe('findPlaceholdersByQualification', () => {
    it('should return correct list of placeholders whitout param', () => {
      const placeholders = findPlaceholdersByQualification()

      expect(placeholders).toHaveLength(0)
    })

    it('should return correct list of placeholders with param', () => {
      const placeholders = findPlaceholdersByQualification(
        fakeQualificationItems
      )

      expect(placeholders).toHaveLength(1)
    })
  })
})
