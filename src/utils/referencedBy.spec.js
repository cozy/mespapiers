import { isReferencedBy, getReferencedBy } from 'src/utils/referencedBy'

const mockFile = {
  _id: '123',
  name: 'fakeFile',
  relationships: {
    referenced_by: {
      data: [
        {
          id: '456',
          type: 'io.cozy.contacts'
        }
      ]
    }
  }
}
describe('referencedBy', () => {
  describe('isReferencedBy', () => {
    it('should return "true"', () => {
      const result = isReferencedBy(mockFile, 'io.cozy.contacts')

      expect(result).toBe(true)
    })
    it('should return "false"', () => {
      const result = isReferencedBy(mockFile, 'io.cozy.xxx')

      expect(result).toBe(false)
    })
  })

  describe('getReferencedBy', () => {
    it('should return "true"', () => {
      const result = getReferencedBy(mockFile, 'io.cozy.contacts')

      expect(result).toEqual([
        {
          id: '456',
          type: 'io.cozy.contacts'
        }
      ])
    })
    it('should return "false"', () => {
      const result = getReferencedBy(mockFile, 'io.cozy.xxx')

      expect(result).toEqual([])
    })
  })
})
