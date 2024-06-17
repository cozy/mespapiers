import { combinePaths } from 'src/helpers/combinePaths'

describe('combinePaths', () => {
  it('should combine paths without a double slash', () => {
    const path1 = '/'
    const path2 = '/files/:id'
    const result1 = combinePaths(path1, path2)
    expect(result1).toBe('/files/:id')

    const path3 = '/files/:id'
    const path4 = '/forward'
    const result2 = combinePaths(path3, path4)
    expect(result2).toBe('/files/:id/forward')
  })
})
