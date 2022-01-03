import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import {
  checkConstraintsOfIinput,
  makeInputTypeAndLength
} from 'src/utils/input'

const isValidEntry = (expectedLength, value) => {
  return (
    (expectedLength > 0 && value.length <= expectedLength) ||
    expectedLength === 0
  )
}

const InputTextAdapter = ({
  attrs,
  setValue,
  setValidInput,
  setIsFocus,
  idx
}) => {
  const { name, inputLabel, metadata, type } = attrs
  const { t } = useI18n()
  const [currentValue, setCurrentValue] = useState(metadata[name] || '')
  const [isError, setIsError] = useState(false)

  const { inputType, expectedLength, isRequired } = useMemo(
    () => makeInputTypeAndLength(type),
    [type]
  )

  useEffect(() => {
    setValue(prev => ({ ...prev, [name]: currentValue }))
  }, [name, setValue, currentValue])

  useEffect(() => {
    setValidInput(prev => ({
      ...prev,
      [idx]: checkConstraintsOfIinput(
        currentValue.length,
        isRequired,
        expectedLength
      )
    }))
  }, [idx, expectedLength, isRequired, setValidInput, currentValue.length])

  /*
  Fix to force Safari to accept only numbers in a field normally of type number
  We simulate the "number" field from a "text" field for at least 2 reasons:
    - Text entries in a "number" field are possible and are not visible in the "value" attribute
    - Avoid poor integration of the "number" field (control arrows on the right in the field)
  The "inputMode" is important to trigger the right keyboard on iOS > 12.1
  */
  const handleOnChange = useCallback(
    evt => {
      const { value: targetValue } = evt.target

      if (inputType === 'number') {
        const parseIntValue = parseInt(targetValue, 10)
        if (/^[0-9]*$/.test(parseIntValue)) {
          if (isValidEntry(expectedLength, targetValue)) {
            setCurrentValue(parseIntValue.toString())
          }
        } else if (targetValue === '') setCurrentValue(targetValue)
      } else {
        if (isValidEntry(expectedLength, targetValue)) {
          setCurrentValue(targetValue)
        }
      }
    },
    [expectedLength, inputType]
  )

  const handleOnFocus = () => {
    setIsFocus(true)
    setIsError(false)
  }

  const handleOnBlur = () => {
    setIsFocus(false)
    if (currentValue.length > 0) {
      setIsError(expectedLength > 0 && currentValue.length !== expectedLength)
    } else setIsError(false)
  }

  const helperText = isError
    ? t('InputTextAdapter.invalidTextMessage', {
        smart_count: expectedLength - currentValue.length
      })
    : ''

  return (
    <TextField
      value={currentValue}
      error={isError}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      helperText={helperText}
      inputProps={{
        inputMode: inputType === 'number' ? 'numeric' : 'text'
      }}
      onChange={handleOnChange}
      variant={'outlined'}
      label={inputLabel ? t(inputLabel) : ''}
      fullWidth
      required={isRequired}
    />
  )
}

const attrsProptypes = PropTypes.shape({
  name: PropTypes.string,
  inputLabel: PropTypes.string,
  metadata: PropTypes.shape({ ['attrsProptypes.name']: PropTypes.string }),
  type: PropTypes.string
})

InputTextAdapter.propTypes = {
  attrs: attrsProptypes.isRequired,
  setValue: PropTypes.func.isRequired,
  setValidInput: PropTypes.func.isRequired,
  idx: PropTypes.number
}

export default InputTextAdapter
