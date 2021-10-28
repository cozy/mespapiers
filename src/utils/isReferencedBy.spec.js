import { isReferencedBy } from 'src/utils/isReferencedBy'

const mockFile = {
  _id: '123',
  name: 'fakeFile',
  referenced_by: [
    {
      id: '456',
      type: 'io.cozy.contacts'
    }
  ]
}

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
