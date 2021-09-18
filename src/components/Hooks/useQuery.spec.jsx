import { useQuery as useQueryCozy } from 'cozy-client'
import { useQuery } from 'src/components/Hooks/useQuery'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

describe('useQuery', () => {
  it('should return correct object when data is "pending"', () => {
    useQueryCozy.mockReturnValueOnce({
      fetchStatus: 'pending',
      data: null
    })
    const result = useQuery({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: true,
      data: []
    })
  })

  it('should return correct object when data is "loading"', () => {
    useQueryCozy.mockReturnValueOnce({
      fetchStatus: 'loading',
      data: []
    })
    const result = useQuery({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: true,
      data: []
    })
  })

  it('should return correct object when data is "loaded"', () => {
    useQueryCozy.mockReturnValueOnce({
      fetchStatus: 'loaded',
      data: [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]
    })
    const result = useQuery({ definition: '', options: '' })
    expect(result).toEqual({
      isQueryLoading: false,
      data: [{ id: '00', name: 'ID card' }, { id: '01', name: 'Passport' }]
    })
  })
})
