import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import ContactList from 'src/components/ModelSteps/ContactList'
import SubmitButton from 'src/components/ModelSteps/widgets/SubmitButton'
import StepperDialogTitle from 'src/components/StepperDialog/StepperDialogTitle'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ContactDialog = ({ currentStep, onClose, onBack, onSubmit }) => {
  const { t } = useI18n()
  const client = useClient()
  const { formData, setFormData } = useFormData()
  const { currentStepIndex, nextStep, isLastStep } = useStepperDialog()
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false)
  const [contactsSelected, setContactsSelected] = useState([])
  const [contactModalOpened, setContactModalOpened] = useState(false)
  const { illustration, text, multiple } = currentStep

  const SubmitButtonComponent = isLastStep() ? SubmitButton : null
  const buttonDisabled = contactsSelected.length === 0 || contactModalOpened

  useEffect(() => {
    const init = async () => {
      const myself = await fetchCurrentUser(client)
      if (myself) {
        setCurrentUser(myself)
        setFormData(prev => ({
          ...prev,
          contacts: [myself]
        }))
        setContactsSelected([myself])
      }
      setCurrentUserLoaded(true)
    }
    init()
  }, [client, setFormData])

  const handleContactSelection = contacts => {
    setContactsSelected(contacts)
    setFormData(prev => ({
      ...prev,
      contacts: contacts
    }))
  }

  return (
    <>
      <Dialog
        open
        {...(currentStepIndex > 0 && { transitionDuration: 0, onBack })}
        onClose={onClose}
        componentsProps={{
          dialogTitle: {
            className: 'u-flex u-flex-justify-between u-flex-items-center'
          }
        }}
        title={<StepperDialogTitle />}
        content={
          <CompositeHeader
            icon={illustration}
            iconSize="small"
            title={t(text)}
            text={
              currentUserLoaded ? (
                <Paper elevation={2} className="u-mh-half">
                  <ContactList
                    className="u-pv-0"
                    multiple={multiple}
                    selected={contactsSelected}
                    currentUser={currentUser}
                    onSelection={handleContactSelection}
                    contactModalOpened={contactModalOpened}
                    setContactModalOpened={setContactModalOpened}
                  />
                </Paper>
              ) : null
            }
          />
        }
        actions={
          SubmitButtonComponent ? (
            <SubmitButtonComponent
              formData={formData}
              onSubmit={onSubmit}
              disabled={buttonDisabled}
            />
          ) : (
            <Button
              data-testid="next-button"
              fullWidth
              label={t('common.next')}
              disabled={buttonDisabled}
              onClick={nextStep}
            />
          )
        }
      />
    </>
  )
}

ContactDialog.propTypes = {
  currentStep: PropTypes.shape({
    illustration: PropTypes.string,
    text: PropTypes.string,
    multiple: PropTypes.bool
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func
}

export default ContactDialog
