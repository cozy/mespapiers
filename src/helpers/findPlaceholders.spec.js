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
    it('should return list of placeholders whitout param', () => {
      const featuredPlaceholders = getFeaturedPlaceholders()

      expect(featuredPlaceholders.length).toBeGreaterThan(0)
    })

    it('should return correct list of placeholders with param', () => {
      const featuredPlaceholders = getFeaturedPlaceholders(fakePapers)

      expect(featuredPlaceholders).toEqual(
        expect.arrayContaining([
          expect.not.objectContaining({
            label: 'national_id_card'
          })
        ])
      )
      expect(featuredPlaceholders).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            label: 'driver_license'
          })
        ])
      )
    })
  })

  describe('findPlaceholdersByQualification', () => {
    it('should return an empty list', () => {
      const placeholders = findPlaceholdersByQualification()

      expect(placeholders).toHaveLength(0)
    })

    it('should return correct list of placeholders with param', () => {
      const placeholders = findPlaceholdersByQualification(
        fakeQualificationItems
      )

      expect(placeholders).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            label: 'national_id_card'
          })
        ])
      )
    })
  })
})
