import React, { forwardRef } from 'react'
import { downloadFiles } from 'src/components/Actions/utils'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

export const download = ({ t, showAlert }) => {
  const label = t('action.download')
  const icon = 'download'

  return {
    name: 'download',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: (docs, { client }) =>
      downloadFiles({ client, files: docs, showAlert, t }),
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