import { makeInputTypeAndLength } from 'src/utils/makeInputTypeAndLength'

describe('makeInputTypeAndLength', () => {
  it('should return type "number" with length to 0', () => {
    const response0 = makeInputTypeAndLength('Number')
    const response1 = makeInputTypeAndLength('Number:')
    const response2 = makeInputTypeAndLength('Number:0')

    const expected = { inputType: 'number', inputMaxLength: 0 }

    expect(response0).toEqual(expected)
    expect(response1).toEqual(expected)
    expect(response2).toEqual(expected)
  })
  it('should return type "number" with length to 10', () => {
    const response = makeInputTypeAndLength('Number:10')

    const expected = { inputType: 'number', inputMaxLength: 10 }

    expect(response).toEqual(expected)
  })

  it('should return type "text" with length to 0', () => {
    const response0 = makeInputTypeAndLength('')
    const response1 = makeInputTypeAndLength('Other:')
    const response2 = makeInputTypeAndLength('Text')

    const expected = { inputType: 'text', inputMaxLength: 0 }

    expect(response0).toEqual(expected)
    expect(response1).toEqual(expected)
    expect(response2).toEqual(expected)
  })
  it('should return type "text" with length to 10', () => {
    const response0 = makeInputTypeAndLength('Text:10')
    const response1 = makeInputTypeAndLength('String:10')
    const response2 = makeInputTypeAndLength(':10')

    const expected = { inputType: 'text', inputMaxLength: 10 }

    expect(response0).toEqual(expected)
    expect(response1).toEqual(expected)
    expect(response2).toEqual(expected)
  })
})
