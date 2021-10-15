import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { makeInputTypeAndLength } from 'src/utils/makeInputTypeAndLength'

const InputTextAdapter = ({ attrs, setValue }) => {
  const { name, inputLabel, metadata, type } = attrs
  const { t } = useI18n()
  const [value, setState] = useState(metadata[name] || '')

  useEffect(() => {
    setValue(prev => ({ ...prev, [name]: value }))
  }, [name, value, setValue])

  const { inputType, inputMaxLength } = useMemo(
    () => makeInputTypeAndLength(type),
    [type]
  )

  const handleOnChange = useCallback(
    evt => {
      const { value } = evt.target
      if (inputMaxLength > 0 && value.length <= inputMaxLength) {
        setState(value)
      } else if (inputMaxLength === 0) {
        setState(value)
      }
    },
    [inputMaxLength]
  )

  return (
    <TextField
      value={value}
      type={inputType}
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
  setValue: PropTypes.func.isRequired
}

export default InputTextAdapter
