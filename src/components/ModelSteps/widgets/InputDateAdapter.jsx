import React, { useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/styles'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const useStyles = makeStyles(() => ({
  overrides: {
    width: '100%',
    height: '2rem',
    MuiOutlinedInput: {
      '&:focused': {
        notchedOutline: {
          borderColor: 'var(--primaryColor)'
        }
      }
    }
  }
}))

const InputDateAdapter = ({ attrs, setValue, setValidInput, idx }) => {
  const { name, inputLabel, metadata } = attrs
  const { t, lang } = useI18n()
  const classes = useStyles()
  const [locales, setLocales] = useState('')
  const [isError, setIsError] = useState(false)
  const [selectedDate, handleDateChange] = useState(metadata[name] || null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const src = require(`date-fns/locale/${lang}/index.js`)
      isMounted && setLocales(src)
    })()

    return () => {
      isMounted = false
    }
  }, [lang])

  useEffect(() => {
    selectedDate && setValue(prev => ({ ...prev, [name]: selectedDate }))
  }, [name, selectedDate, setValue])

  useEffect(() => {
    setValidInput(prev => ({
      ...prev,
      [idx]: isError
    }))
  }, [idx, isError, setValidInput])

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={locales}
      className={'TEST'}
    >
      <KeyboardDatePicker
        placeholder={'01/01/2022'}
        className={classes.overrides}
        value={selectedDate}
        label={inputLabel ? t(inputLabel) : ''}
        invalidDateMessage={t('InputDateAdapter.invalidDateMessage')}
        onChange={handleDateChange}
        inputVariant={'outlined'}
        cancelLabel={t('common.cancel')}
        format={lang === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'}
        onError={(err, val) => {
          setIsError(val === null || !!new Date(val).getTime())
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default InputDateAdapter
