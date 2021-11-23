import React, { useState, useEffect } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'
import Paper from 'cozy-ui/transpiled/react/Paper'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Button from 'cozy-ui/transpiled/react/Button'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Right from 'cozy-ui/transpiled/react/Icons/Right'
import Radio from 'cozy-ui/transpiled/react/Radio'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import ContactsListModal from 'cozy-ui/transpiled/react/ContactsListModal'

import { useFormData } from 'src/components/Hooks/useFormData'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const Contact = () => {
  const client = useClient()
  const { t } = useI18n()
  const { setFormData } = useFormData()
  const [contactModalOpened, setContactModalOpened] = useState(false)
  const [contactsList, setContactsList] = useState([])
  const [contactIdSelected, setContactIdSelected] = useState(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const myself = await fetchCurrentUser(client)
      if (isMounted) {
        setContactsList([myself])
        setContactIdSelected(myself._id)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [client])

  useEffect(() => {
    if (contactIdSelected) {
      setFormData(prev => ({
        ...prev,
        contacts: contactsList.filter(
          contact => contact._id === contactIdSelected
        )
      }))
    }
  }, [contactIdSelected, contactsList, setFormData])

  const onChangeRadio = evt => setContactIdSelected(evt.target.value)

  const onClickContactsListModal = contact => {
    const contactAlreadyListed = contactsList.some(cl => cl._id === contact._id)
    if (!contactAlreadyListed) {
      setContactsList(prev => [...prev, contact])
    }
    setContactIdSelected(contact._id)
    setContactModalOpened(false)
  }

  return (
    <>
      <Paper elevation={2} className={'u-mt-1'}>
        <List>
          <div className={'u-mah-5 u-ov-scroll'}>
            {contactsList.map(contact => (
              <ListItem
                key={contact._id}
                onClick={() => setContactIdSelected(contact._id)}
              >
                <ListItemIcon>
                  <Avatar
                    size={'small'}
                    style={{
                      color: 'var(--primaryColor)',
                      backgroundColor: 'var(--primaryColorLightest)'
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${contact.fullname} ${
                    contact.me ? `(${t('ContactStep.me')})` : ''
                  }`}
                />
                <ListItemSecondaryAction className={'u-mr-half'}>
                  <Radio
                    checked={contactIdSelected === contact._id}
                    onChange={onChangeRadio}
                    value={contact._id}
                    name="radio-contactsList"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </div>

          <Divider variant="inset" component="li" />

          <ListItem onClick={() => setContactModalOpened(true)}>
            <ListItemIcon>
              <Avatar
                size={'small'}
                style={{
                  color: 'var(--primaryColor)',
                  backgroundColor: 'var(--primaryColorLightest)'
                }}
              />
            </ListItemIcon>
            <ListItemText primary={t('ContactStep.other')} />
            <Icon icon={Right} size={16} color={'var(--secondaryTextColor)'} />
          </ListItem>
        </List>
      </Paper>
      {contactModalOpened && (
        <ContactsListModal
          placeholder={t('ContactStep.contactModal.placeholder')}
          dismissAction={() => setContactModalOpened(false)}
          onItemClick={contact => onClickContactsListModal(contact)}
          addContactLabel={t('ContactStep.contactModal.addContactLabel')}
          emptyMessage={t('ContactStep.contactModal.emptyContact')}
        />
      )}
    </>
  )
}

const ContactWrapper = ({ currentStep }) => {
  const { t } = useI18n()
  const { illustration, text } = currentStep
  const { formSubmit } = useFormData()
  const [onLoad, setOnLoad] = useState(false)

  const submit = () => {
    setOnLoad(true)
    formSubmit()
  }

  return (
    <>
      <CompositeHeader
        icon={illustration}
        iconSize={'small'}
        title={t(text)}
        text={<Contact />}
      />
      <DialogActions className={'u-w-100 u-mh-0 u-mb-1 cozyDialogActions'}>
        <Button
          className="u-db"
          extension="full"
          label={t(!onLoad ? 'ContactStep.save' : 'ContactStep.onLoad')}
          onClick={submit}
          disabled={onLoad}
          busy={onLoad}
        />
      </DialogActions>
    </>
  )
}

export default ContactWrapper
