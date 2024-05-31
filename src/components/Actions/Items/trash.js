import React, { forwardRef } from 'react'
import DeleteConfirm from 'src/components/Actions/DeleteConfirm'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

export const trash = ({ t, pushModal, popModal }) => {
  const label = t('action.trash')
  const icon = 'trash'

  return {
    name: 'trash',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: (docs, { isLast }) =>
      pushModal(
        <DeleteConfirm files={docs} isLast={isLast} onClose={popModal} />
      ),
    // eslint-disable-next-line react/display-name
    Component: forwardRef((props, ref) => {
      return (
        <ActionsMenuItem {...props} ref={ref}>
          <ListItemIcon>
            <Icon icon={icon} color="var(--errorColor)" />
          </ListItemIcon>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ color: 'error' }}
          />
        </ActionsMenuItem>
      )
    })
  }
}
