import React, { forwardRef } from 'react'
import { downloadFiles } from 'src/components/Actions/utils'
import withLocales from 'src/locales/withLocales'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

export const download = ({
  t,
  showAlert,
  navigate,
  isMultiSelectionActive
}) => {
  const label = t('action.download')
  const icon = 'download'

  return {
    name: 'download',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: async (docs, { client }) => {
      await downloadFiles({ client, files: docs, showAlert, t })
      isMultiSelectionActive && navigate('..')
    },
    Component: withLocales(
      // eslint-disable-next-line react/display-name
      forwardRef((props, ref) => {
        return (
          <ActionsMenuItem {...props} ref={ref}>
            <ListItemIcon>
              <Icon icon={icon} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ActionsMenuItem>
        )
      })
    )
  }
}
