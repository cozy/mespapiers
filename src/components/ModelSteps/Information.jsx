import React, { useState, useMemo, useCallback } from 'react'
import cx from 'classnames'

import { isIOS } from 'cozy-device-helper'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useFormData } from 'src/components/Hooks/useFormData'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import InputDateAdapter from 'src/components/ModelSteps/widgets/InputDateAdapter'
import InputTextAdapter from 'src/components/ModelSteps/widgets/InputTextAdapter'
import IlluGenericInputText from 'src/assets/icons/IlluGenericInputText.svg'
import IlluGenericInputDate from 'src/assets/icons/IlluGenericInputDate.svg'
import { hasNextvalue } from 'src/utils/hasNextvalue'

const Information = ({ currentStep }) => {
  const { t } = useI18n()
  const { illustration, text, attributes } = currentStep
  const { formData, setFormData } = useFormData()
  const { nextStep } = useStepperDialog()
  const [value, setValue] = useState({})
  const [validInput, setValidInput] = useState({})
  const [isFocus, setIsFocus] = useState(false)

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
      attributes
        ? attributes.map(({ name, type, inputLabel }) => {
            switch (type) {
              case 'date':
                return function InputDate(props) {
                  return (
                    <InputDateAdapter
                      attrs={{ metadata: formData.metadata, name, inputLabel }}
                      setValue={setValue}
                      setValidInput={setValidInput}
                      setIsFocus={setIsFocus}
                      {...props}
                    />
                  )
                }
              default:
                return function InputText(props) {
                  return (
                    <InputTextAdapter
                      attrs={{
                        metadata: formData.metadata,
                        name,
                        inputLabel,
                        type
                      }}
                      setValue={setValue}
                      setValidInput={setValidInput}
                      setIsFocus={setIsFocus}
                      {...props}
                    />
                  )
                }
            }
          })
        : [],
    [attributes, formData.metadata]
  )

  const hasMarginBottom = useCallback(idx => hasNextvalue(idx, inputs), [
    inputs
  ])

  const allInputsValid = useMemo(
    () => Object.keys(validInput).every(val => validInput[val]),
    [validInput]
  )
  const fallbackIcon =
    attributes?.[0]?.type === 'date'
      ? IlluGenericInputDate
      : IlluGenericInputText

  return (
    <>
      <CompositeHeader
        icon={illustration}
        iconSize={isFocus && isIOS() ? 'normal' : 'large'}
        className={isFocus && isIOS() ? 'is-focused' : ''}
        fallbackIcon={fallbackIcon}
        title={t(text)}
        text={inputs.map((Input, idx) => (
          <div
            key={idx}
            className={cx('u-mh-1', {
              ['u-h-3 u-pb-1-half']: hasMarginBottom(idx)
            })}
          >
            <Input idx={idx} />
          </div>
        ))}
      />
      <DialogActions disableSpacing className={'columnLayout u-mh-0'}>
        <Button
          className="u-db"
          extension="full"
          label={t('common.next')}
          onClick={submit}
          disabled={!allInputsValid}
        />
      </DialogActions>
    </>
  )
}

export default React.memo(Information)
