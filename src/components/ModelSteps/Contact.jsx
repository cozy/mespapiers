import React from 'react'

import { getDisplayName } from 'cozy-client/dist/models/contact'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Radio from 'cozy-ui/transpiled/react/Radios'
import Avatar from 'cozy-ui/transpiled/react/legacy/Avatar'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const styleAvatar = {
  color: 'var(--primaryColor)',
  backgroundColor: 'var(--primaryColorLightest)'
}

const Contact = ({ contact, multiple, selected, onSelection }) => {
  const { t } = useI18n()

  return (
    <ListItem button key={contact._id} onClick={() => onSelection(contact._id)}>
      <ListItemIcon>
        <Avatar size="small" style={styleAvatar} />
      </ListItemIcon>
      <ListItemText
        primary={`${getDisplayName(contact)} ${
          contact.me ? `(${t('ContactStep.me')})` : ''
        }`}
      />
      <ListItemSecondaryAction className="u-mr-half">
        {multiple ? (
          <Checkbox
            checked={selected}
            onChange={onSelection}
            value={contact._id}
            name="checkbox-contactsList"
          />
        ) : (
          <Radio
            checked={selected}
            onChange={onSelection}
            value={contact._id}
            name="radio-contactsList"
          />
        )}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Contact
