import React, { forwardRef } from 'react'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const scanPicture = ({ paperDefinition, scanPictureOnclick }) => {
  return {
    name: 'scanPicture',
    action: scanPictureOnclick,
    // eslint-disable-next-line react/display-name
    Component: forwardRef((props, ref) => {
      const { t } = useI18n()

      const { acquisitionSteps } = paperDefinition
      const hasSteps = acquisitionSteps?.length > 0

      return (
        <ActionsMenuItem {...props} ref={ref} disabled={!hasSteps}>
          <ListItemIcon>
            <Icon icon="camera" size={16} />
          </ListItemIcon>
          <ListItemText
            primary={t('ImportDropdown.scanPicture.title')}
            secondary={t('ImportDropdown.scanPicture.text')}
          />
        </ActionsMenuItem>
      )
    })
  }
}
