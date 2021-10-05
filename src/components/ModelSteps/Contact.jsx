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

import { useFormDataContext } from 'src/components/Hooks/useFormDataContext'
import { fetchCurrentUser } from 'src/utils/fetchCurrentUser'

import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'

const Contact = () => {
  const client = useClient()
  const { t } = useI18n()
  const { formSubmit } = useFormDataContext()
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
        <ListItem onClick={formSubmit}>
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
            primary={t('ContactAdapter.me', {
              name: currentUser?.fullname || ''
            })}
          />
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
          <ListItemText primary={t('ContactAdapter.other')} />
          <ListItemSecondaryAction>
            <Button
              label={t('ContactAdapter.other')}
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

  return (
    <CompositeHeader
      icon={illustration}
      iconSize={'small'}
      title={t(text)}
      text={<Contact />}
    />
  )
}

export default ContactWrapper
