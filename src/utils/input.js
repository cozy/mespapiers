import log from 'cozy-logger'
const NUMBER = 'Number'
const TEXT = 'Text'

/**
 * Make type and length properties
 * @param {string} typeDefinition - Definition of type & length of the input
 * @example
 * // For make input number with contraint length to 12
 * makeInputTypeAndLength("Number:12")
 * // For make input text with no contraint length
 * makeInputTypeAndLength("Text")
 * // For make input number with contraint length to 12 & required
 * makeInputTypeAndLength("*Number:12")
 */
export const makeInputTypeAndLength = typeDefinition => {
  const isRequired = typeDefinition[0] === '*'
  const [type = typeDefinition, maxLength] = typeDefinition
    .replace('*', '')
    .split(':')

  const result = { inputType: '', expectedLength: 0, isRequired }
  switch (type) {
    case NUMBER:
      result.inputType = NUMBER.toLowerCase()
      break
    case TEXT:
      result.inputType = TEXT.toLowerCase()
      break
    default:
      log(
        'warn',
        '"type" in "attributes" property is not defined or unexpected, "type" set to "text" by default'
      )
      result.inputType = TEXT.toLowerCase()
      break
  }

  if (maxLength) result.expectedLength = parseInt(maxLength, 10)

  return result
}

/**
 * @param {number} valueLength - Length of input value
 * @param {boolean} isRequired - If value is required
 * @param {number} expectedLength - Expected length of the input value
 * @returns {boolean}
 */
export const checkConstraintsOfIinput = (
  valueLength,
  isRequired,
  expectedLength
) => {
  let isValid = false

  if (expectedLength) {
    isValid =
      valueLength === expectedLength || (valueLength === 0 && !isRequired)
  } else {
    isValid = isRequired ? valueLength > 0 : true
  }

  return isValid
}
