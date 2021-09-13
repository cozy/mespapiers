import React, { useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DatePicker } from '@material-ui/pickers'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const InputDateAdapter = ({ onChange, schema }) => {
  const { t, lang } = useI18n()
  const { nextPage } = useStepperDialogContext()
  const [locales, setLocales] = useState('')
  const [selectedDate, handleDateChange] = useState(new Date())

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const src = await import(`date-fns/locale/${lang}`)
      isMounted && setLocales(src.default)
    })()

    return () => {
      isMounted = false
    }
  }, [lang])

  useEffect(() => onChange(selectedDate.toISOString()), [
    onChange,
    selectedDate
  ])

  return (
    <>
      <div className={'u-h-100'}>
        <CompositeHeader
          icon={schema.illustration}
          title={t(schema.text)}
          text={
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locales}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                inputVariant={'outlined'}
                cancelLabel={t('common.cancel')}
                format={lang === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'}
              />
            </MuiPickersUtilsProvider>
          }
        />
      </div>
      <DialogActions disableSpacing className={'columnLayout'}>
        <Button
          className="u-db"
          extension="full"
          label={t('common.next')}
          disabled={selectedDate.length === 0}
          onClick={nextPage}
        />
      </DialogActions>
    </>
  )
}

export default InputDateAdapter
