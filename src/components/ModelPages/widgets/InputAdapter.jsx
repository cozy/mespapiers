import React, { useState, useEffect } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import Input from 'cozy-ui/transpiled/react/Input'
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
      <div>
        <CompositeHeader icon={schema.illustration} title={t(schema.text)} />
        <Input
          onChange={evt => setValue(evt.target.value)}
          placeholder="..."
          value={value}
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
