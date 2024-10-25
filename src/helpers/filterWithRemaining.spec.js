import { filterWithRemaining } from 'src/helpers/filterWithRemaining'

const mockObjectInArray = [
  { model: 'scan' },
  { model: 'information' },
  { model: 'owner' }
]
const mockStringInArray = ['scan', 'information', 'owner']

describe('filterWithRemaining', () => {
  it('should be return correct value with "owner" object filter', () => {
    const testFunction = ({ model }) => {
      return model === 'owner'
    }
    const res = filterWithRemaining(mockObjectInArray, testFunction)

    expect(res).toStrictEqual({
      itemsFound: [{ model: 'owner' }],
      remainingItems: [{ model: 'scan' }, { model: 'information' }]
    })
  })

  it('should be return correct value with "owner" & "scan" object filter', () => {
    const testFunction = ({ model }) => {
      return model === 'owner' || model === 'scan'
    }
    const res = filterWithRemaining(mockObjectInArray, testFunction)

    expect(res).toStrictEqual({
      itemsFound: [{ model: 'scan' }, { model: 'owner' }],
      remainingItems: [{ model: 'information' }]
    })
  })

  it('should be return correct value with filter by index', () => {
    const testFunction = (_, index) => index === 1
    const res = filterWithRemaining(mockObjectInArray, testFunction)

    expect(res).toStrictEqual({
      itemsFound: [{ model: 'information' }],
      remainingItems: [{ model: 'scan' }, { model: 'owner' }]
    })
  })

  it('should be return correct value with "owner" string filter', () => {
    const testFunction = item => item === 'owner'
    const res = filterWithRemaining(mockStringInArray, testFunction)

    expect(res).toStrictEqual({
      itemsFound: ['owner'],
      remainingItems: ['scan', 'information']
    })
  })
})
