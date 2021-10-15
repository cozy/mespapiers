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
 */
export const makeInputTypeAndLength = typeDefinition => {
  const [type = typeDefinition, maxLength] = typeDefinition.split(':')
  const result = { inputType: '', inputMaxLength: 0 }

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

  if (maxLength) result.inputMaxLength = parseInt(maxLength, 10)

  return result
}
