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
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import Radio from 'cozy-ui/transpiled/react/Radio'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'

import { useFormData } from 'src/components/Hooks/useFormData'
import { fetchCurrentUser } from 'src/helpers/fetchCurrentUser'
import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const Contact = () => {
  const client = useClient()
  const { t } = useI18n()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const user = await fetchCurrentUser(client)
      isMounted && setCurrentUser(user)
    })()

    return () => {
      isMounted = false
    }
  }, [client])

  return (
    <Paper elevation={2} className={'u-mt-1'}>
      <List>
        <ListItem>
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
            primary={`${t('ContactStep.me')} ${
              currentUser ? `(${currentUser.fullname})` : ''
            }`}
          />
          <ListItemSecondaryAction className={'u-mr-half'}>
            <Radio defaultChecked />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider variant="inset" component="li" />

        <ListItem disabled>
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
          <ListItemSecondaryAction>
            <Button
              label={t('ContactStep.other')}
              theme="text"
              icon={RightIcon}
              extension="narrow"
              iconOnly
              style={{
                color: 'var(--secondaryTextColor)'
              }}
              className="u-m-0"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
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
      <DialogActions className={'u-w-100 u-mh-0'}>
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
