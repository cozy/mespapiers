import React, { useState, useMemo, useCallback } from 'react'

import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useFormDataContext } from 'src/components/Hooks/useFormDataContext'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import InputDateAdapter from 'src/components/ModelSteps/widgets/InputDateAdapter'
import InputTextAdapter from 'src/components/ModelSteps/widgets/InputTextAdapter'
import GenericInputText from 'src/assets/icons/GenericInputText.svg'
import { hasNextvalue } from 'src/utils/hasNextvalue'

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

  const inputs = useMemo(
    () =>
      attributes.map(({ name, type, inputLabel }) => {
        switch (type) {
          case 'date':
            return (
              <InputDateAdapter
                attrs={{ metadata: formData.metadata, name, inputLabel }}
                setValue={setValue}
              />
            )
          default:
            return (
              <InputTextAdapter
                attrs={{ metadata: formData.metadata, name, inputLabel, type }}
                setValue={setValue}
              />
            )
        }
      }),
    [attributes, formData.metadata]
  )

  const hasMarginBottom = useCallback(idx => hasNextvalue(idx, inputs), [
    inputs
  ])

  return (
    <>
      <div className={'u-h-100'}>
        <CompositeHeader
          icon={illustration}
          fallbackIcon={GenericInputText}
          iconSize={'medium'}
          title={t(text)}
          text={inputs.map((Input, idx) => (
            <div key={idx} className={hasMarginBottom(idx) ? 'u-mb-1' : ''}>
              {Input}
            </div>
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

export default React.memo(Information)
