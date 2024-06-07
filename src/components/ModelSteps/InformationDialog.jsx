import cx from 'classnames'
import get from 'lodash/get'
import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import IlluGenericInputDate from 'src/assets/icons/IlluGenericInputDate.svg'
import IlluGenericInputText from 'src/assets/icons/IlluGenericInputText.svg'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { normalizeFormdataMetadata } from 'src/components/ModelSteps/helpers'
import SubmitButton from 'src/components/ModelSteps/widgets/SubmitButton'
import StepperDialogTitle from 'src/components/StepperDialog/StepperDialogTitle'
import { FILES_DOCTYPE, KEYS } from 'src/constants'
import { hasNextvalue } from 'src/helpers/hasNextvalue'
import { makeInputsInformationStep } from 'src/helpers/makeInputsInformationStep'

import { isIOS } from 'cozy-device-helper'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import PointerAlert from 'cozy-ui/transpiled/react/PointerAlert'
import useEventListener from 'cozy-ui/transpiled/react/hooks/useEventListener'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const InformationDialog = ({ currentStep, onClose, onBack, onSubmit }) => {
  const {
    illustration,
    illustrationSize = 'medium',
    text,
    doctype = FILES_DOCTYPE,
    attributes
  } = currentStep
  const { t } = useI18n()
  const {
    currentStepIndex,
    nextStep,
    isLastStep,
    allCurrentSteps,
    currentDefinition
  } = useStepperDialog()
  const { formData, setFormData } = useFormData()
  const [value, setValue] = useState({})
  const [validInput, setValidInput] = useState({})
  const [isFocus, setIsFocus] = useState(false)

  const newFormData = normalizeFormdataMetadata({
    formData,
    doctype,
    newMetadata: value
  })

  const submit = throttle(() => {
    if (value && allInputsValid) {
      setFormData(newFormData)
      nextStep()
    }
  }, 100)

  const handleKeyDown = useCallback(
    evt => {
      if (evt.key === KEYS.ENTER) submit()
    },
    [submit]
  )

  useEventListener(window, 'keydown', handleKeyDown)

  const inputs = makeInputsInformationStep(attributes)

  const hasMarginBottom = useCallback(
    idx => hasNextvalue(idx, inputs),
    [inputs]
  )

  const allInputsValid = useMemo(
    () => Object.keys(validInput).every(val => validInput[val]),
    [validInput]
  )
  const fallbackIcon =
    attributes?.[0]?.type === 'date'
      ? IlluGenericInputDate
      : IlluGenericInputText

  const showSubmitButton = isLastStep()
  const isActionButtonDisabled = !allInputsValid

  return (
    <FixedDialog
      open
      {...(currentStepIndex > 0 && { transitionDuration: 0 })}
      onClose={onClose}
      onBack={onBack}
      componentsProps={{
        dialogTitle: {
          className: 'u-flex u-flex-justify-between u-flex-items-center'
        }
      }}
      title={<StepperDialogTitle />}
      content={
        <CompositeHeader
          icon={illustration ? illustration : null}
          iconSize={illustrationSize}
          className={isFocus && isIOS() ? 'is-focused' : ''}
          fallbackIcon={illustration !== false ? fallbackIcon : null}
          title={t(text)}
          text={
            <>
              {allCurrentSteps[currentStepIndex].isDisplayed === 'ocr' && (
                <PointerAlert className="u-mb-1" icon={false}>
                  {t('OcrInfoDialog.helpTooltip')}
                </PointerAlert>
              )}
              {inputs.map(({ Component, attrs }, idx) => (
                <div
                  key={idx}
                  className={cx('u-mh-1', {
                    ['u-h-3 u-pb-1-half']: hasMarginBottom(idx),
                    ['u-stack-m']: attrs.options
                  })}
                >
                  <Component
                    attrs={attrs}
                    formDataValue={get(formData, `metadata[${attrs.name}]`)}
                    currentDefinition={currentDefinition}
                    setValue={setValue}
                    setValidInput={setValidInput}
                    onFocus={setIsFocus}
                    idx={idx}
                  />
                </div>
              ))}
            </>
          }
        />
      }
      actions={
        showSubmitButton ? (
          <SubmitButton
            onSubmit={onSubmit}
            disabled={isActionButtonDisabled}
            formData={newFormData}
          />
        ) : (
          <Button
            label={t('common.next')}
            onClick={submit}
            fullWidth
            onTouchEnd={evt => {
              evt.preventDefault()
              submit()
            }}
            disabled={isActionButtonDisabled}
          />
        )
      }
    />
  )
}

InformationDialog.propTypes = {
  currentStep: PropTypes.shape({
    illustration: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    illustrationSize: PropTypes.string,
    text: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func
}

export default InformationDialog
