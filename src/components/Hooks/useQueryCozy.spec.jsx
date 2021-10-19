import { useQuery } from 'cozy-client'
import { useQueryCozy } from 'src/components/Hooks/useQueryCozy'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

describe('useQueryCozy', () => {
  it('should return correct object when data is "pending"', () => {
    useQuery.mockReturnValueOnce({
      fetchStatus: 'pending',
      data: null
    })
    const result = useQueryCozy({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: true,
      data: []
    })
  })

  it('should return correct object when data is "loading"', () => {
    useQuery.mockReturnValueOnce({
      fetchStatus: 'loading',
      data: []
    })
    const result = useQueryCozy({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: true,
      data: []
    })
  })

  it('should return correct object when data is "loaded"', () => {
    useQuery.mockReturnValueOnce({
      fetchStatus: 'loaded',
      data: [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]
    })
    const result = useQueryCozy({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: false,
      data: [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]
    })
  })
})
