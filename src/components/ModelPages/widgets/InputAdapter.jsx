import React, { useState, useEffect } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const InputAdapter = ({ onChange, schema }) => {
  const { t } = useI18n()
  const { nextPage } = useStepperDialogContext()
  const [value, setValue] = useState('')

  useEffect(() => onChange(value), [onChange, value])

  return (
    <>
      <div className={'u-h-100'}>
        <CompositeHeader
          icon={schema.illustration}
          title={t(schema.text)}
          text={
            <TextField
              onChange={evt => setValue(evt.target.value)}
              className={'u-mt-1'}
              value={value}
              variant="outlined"
            />
          }
        />
      </div>
      <DialogActions disableSpacing className={'columnLayout'}>
        <Button
          className="u-db"
          extension="full"
          label={t('common.next')}
          disabled={value.length === 0}
          onClick={nextPage}
        />
      </DialogActions>
    </>
  )
}

export default InputAdapter
