import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { makeInputTypeAndLength } from 'src/utils/makeInputTypeAndLength'

const isValidEntry = (inputMaxLength, value) => {
  return (
    (inputMaxLength > 0 && value.length <= inputMaxLength) ||
    inputMaxLength === 0
  )
}

const InputTextAdapter = ({ attrs, setValue, setValidInput, idx }) => {
  const { name, inputLabel, metadata, type } = attrs
  const { t } = useI18n()
  const [state, setState] = useState(metadata[name] || '')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setValue(prev => ({ ...prev, [name]: state }))
  }, [name, setValue, state])

  useEffect(() => {
    setValidInput(prev => ({
      ...prev,
      [idx]: state.length === 0 || state.length === inputMaxLength
    }))
  }, [idx, inputMaxLength, setValidInput, state.length])

  const { inputType, inputMaxLength } = useMemo(
    () => makeInputTypeAndLength(type),
    [type]
  )

  /*
  Fix to force Safari to accept only numbers in a field normally of type number
  We simulate the "number" field from a "text" field for at least 2 reasons:
    - Text entries in a "number" field are possible and are not visible in the "value" attribute
    - Avoid poor integration of the "number" field (control arrows on the right in the field)
  The "inputMode" is important to trigger the right keyboard on iOS > 12.1
  */
  const handleOnChange = useCallback(
    evt => {
      const { value } = evt.target

      if (inputType === 'number') {
        const parseIntValue = parseInt(value, 10)
        if (/^[0-9]*$/.test(parseIntValue)) {
          if (isValidEntry(inputMaxLength, value)) {
            setState(parseIntValue.toString())
          }
        } else if (value === '') setState(value)
      } else {
        if (isValidEntry(inputMaxLength, value)) {
          setState(value)
        }
      }
    },
    [inputMaxLength, inputType]
  )

  const handleOnFocus = () => setIsError(false)

  const handleOnBlur = () => {
    if (state.length > 0) {
      setIsError(inputMaxLength > 0 && state.length < inputMaxLength)
    } else setIsError(false)
  }

  const helperText = isError
    ? t('InputTextAdapter.invalidTextMessage', {
        smart_count: inputMaxLength - state.length
      })
    : ''

  return (
    <TextField
      value={state}
      className={'u-h-2'}
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
      autoFocus
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
