import React, { useState, useEffect } from 'react'

import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const InputTextAdapter = ({ attrs, setValue }) => {
  const { name, inputLabel, metadata } = attrs
  const { t } = useI18n()
  const [value, setState] = useState(metadata[name] || '')

  useEffect(() => {
    setValue(prev => ({ ...prev, [name]: value }))
  }, [name, value, setValue])

  return (
    <TextField
      value={value}
      onChange={evt => setState(evt.target.value)}
      variant={'outlined'}
      label={inputLabel ? t(inputLabel) : ''}
      fullWidth
      autoFocus
    />
  )
}

export default InputTextAdapter
