import React, { useState, useRef, useEffect } from 'react'

import Paper from 'cozy-ui/transpiled/react/Paper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
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
import { useQuery } from 'src/components/Hooks/useQuery'
import { getCurrentUser } from 'src/utils/queries'

const ContactAdapter = () => {
  const { t } = useI18n()
  const { setFormData } = useFormDataContext()
  const ref = useRef(null)
  const { data: currentUser } = useQuery(getCurrentUser)
  const [contactId, setContactId] = useState('')

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      contactId
    }))
  }, [contactId, setFormData])

  return (
    <Paper
      elevation={2}
      onClick={() => setContactId(currentUser?.[0]?.id || '')}
      className={'u-mt-1'}
    >
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
            <button type="submit" hidden ref={ref} />
          </ListItemIcon>
          <ListItemText
            primary={t('ContactAdapter.me', {
              name: currentUser?.[0]?.fullname || ''
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

export default ContactAdapter
