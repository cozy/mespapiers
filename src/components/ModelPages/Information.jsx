import React, { useState, Fragment } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useFormDataContext } from 'src/components/Hooks/useFormDataContext'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import InputDateAdapter from 'src/components/ModelPages/widgets/InputDateAdapter'
import InputTextAdapter from 'src/components/ModelPages/widgets/InputTextAdapter'

const Information = ({ currentPage }) => {
  const { t } = useI18n()
  const { illustration, text, attributes, rel } = currentPage
  const { formData, setFormData } = useFormDataContext()
  const { nextPage } = useStepperDialogContext()
  const [value, setValue] = useState({})

  const submit = () => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        [rel]: { ...prev[rel], metadata: value }
      }))
      nextPage()
    }
  }

  const inputs = attributes.map(({ name, type, inputLabel }) => {
    switch (type) {
      case 'date':
        return (
          <InputDateAdapter
            attrs={{ metadata: formData[rel].metadata, name, inputLabel }}
            setValue={setValue}
          />
        )
      case 'frenchIdCardNumber':
        return (
          <InputTextAdapter
            attrs={{ metadata: formData[rel].metadata, name, inputLabel }}
            setValue={setValue}
          />
        )
    }
  })

  return (
    <>
      <div className={'u-h-100'}>
        <CompositeHeader
          icon={illustration}
          iconSize={'medium'}
          title={t(text)}
          text={inputs.map((Input, idx) => (
            <Fragment key={idx}>{Input}</Fragment>
          ))}
        />
      </div>
      <DialogActions disableSpacing className={'columnLayout'}>
        <Button
          className="u-db"
          extension="full"
          label={t('common.next')}
          onClick={submit}
        />
      </DialogActions>
    </>
  )
}

export default Information
