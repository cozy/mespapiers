import React, { forwardRef } from 'react'

import { isFromKonnector } from 'cozy-client/dist/models/file'
import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

export const modify = ({ t, navigate }) => {
  const label = t('action.modify')
  const icon = 'text-info'

  return {
    name: 'modify',
    label,
    icon,
    disabled: docs => docs.length === 0,
    displayCondition: docs => docs.length === 1 && !isFromKonnector(docs[0]),
    action: docs => {
      navigate(`edit/${docs[0]._id}`)
    },
    // eslint-disable-next-line react/display-name
    Component: forwardRef((props, ref) => {
      return (
        <ActionsMenuItem {...props} ref={ref}>
          <ListItemIcon>
            <Icon icon={icon} />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ActionsMenuItem>
      )
    })
  }
}
