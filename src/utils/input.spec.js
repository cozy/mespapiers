import {
  checkConstraintsOfIinput,
  makeInputTypeAndLength
} from 'src/utils/input'

describe('Input Utils', () => {
  describe('makeInputTypeAndLength', () => {
    it.each`
      opts            | result
      ${'Number'}     | ${{ inputType: 'number', expectedLength: 0, isRequired: false }}
      ${'Number:'}    | ${{ inputType: 'number', expectedLength: 0, isRequired: false }}
      ${'Number:0'}   | ${{ inputType: 'number', expectedLength: 0, isRequired: false }}
      ${'Number:10'}  | ${{ inputType: 'number', expectedLength: 10, isRequired: false }}
      ${''}           | ${{ inputType: 'text', expectedLength: 0, isRequired: false }}
      ${'Other:'}     | ${{ inputType: 'text', expectedLength: 0, isRequired: false }}
      ${'Text'}       | ${{ inputType: 'text', expectedLength: 0, isRequired: false }}
      ${'Text:10'}    | ${{ inputType: 'text', expectedLength: 10, isRequired: false }}
      ${'String:10'}  | ${{ inputType: 'text', expectedLength: 10, isRequired: false }}
      ${':10'}        | ${{ inputType: 'text', expectedLength: 10, isRequired: false }}
      ${'*'}          | ${{ inputType: 'text', expectedLength: 0, isRequired: true }}
      ${'*:10'}       | ${{ inputType: 'text', expectedLength: 10, isRequired: true }}
      ${'*Text:10'}   | ${{ inputType: 'text', expectedLength: 10, isRequired: true }}
      ${'*Number'}    | ${{ inputType: 'number', expectedLength: 0, isRequired: true }}
      ${'*Number:10'} | ${{ inputType: 'number', expectedLength: 10, isRequired: true }}
    `(
      `should return $result when passed argument: $opts`,
      ({ opts, result }) => {
        expect(makeInputTypeAndLength(opts)).toEqual(result)
      }
    )
  })

  describe('checkInputConstraints', () => {
    it.each`
      valueLength | isRequired | expectedLength | result
      ${0}        | ${false}   | ${0}           | ${true}
      ${10}       | ${false}   | ${0}           | ${true}
      ${0}        | ${true}    | ${0}           | ${false}
      ${10}       | ${true}    | ${0}           | ${true}
      ${0}        | ${false}   | ${10}          | ${true}
      ${5}        | ${false}   | ${10}          | ${false}
      ${10}       | ${true}    | ${10}          | ${true}
      ${5}        | ${true}    | ${10}          | ${false}
    `(
      `should return $result when passed argument: ($valueLength, $isRequired, $expectedLength)`,
      ({ valueLength, isRequired, expectedLength, result }) => {
        expect(
          checkConstraintsOfIinput(valueLength, isRequired, expectedLength)
        ).toEqual(result)
      }
    )
  })
})
