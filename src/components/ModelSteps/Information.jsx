import React, { useState, Fragment } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useFormDataContext } from 'src/components/Hooks/useFormDataContext'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import InputDateAdapter from 'src/components/ModelSteps/widgets/InputDateAdapter'
import InputTextAdapter from 'src/components/ModelSteps/widgets/InputTextAdapter'
import GenericInputText from 'src/assets/icons/GenericInputText.svg'

const Information = ({ currentStep }) => {
  const { t } = useI18n()
  const { illustration, text, attributes } = currentStep
  const { formData, setFormData } = useFormDataContext()
  const { nextStep } = useStepperDialogContext()
  const [value, setValue] = useState({})

  const submit = () => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          ...value
        }
      }))
      nextStep()
    }
  }

  const inputs = attributes.map(({ name, type, inputLabel }) => {
    switch (type) {
      case 'date':
        return (
          <InputDateAdapter
            attrs={{ metadata: formData.metadata, name, inputLabel }}
            setValue={setValue}
          />
        )
      case 'frenchIdCardNumber':
        return (
          <InputTextAdapter
            attrs={{ metadata: formData.metadata, name, inputLabel }}
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
          fallbackIcon={GenericInputText}
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
