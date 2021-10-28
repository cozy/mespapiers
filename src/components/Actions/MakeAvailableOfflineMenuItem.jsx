import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'
import { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import PhoneDownloadIcon from 'cozy-ui/transpiled/react/Icons/PhoneDownload'

const useStyles = makeStyles(() => ({
  sizeSmall: {
    marginTop: '-0.2rem'
  }
}))

const MakeAvailableOfflineMenuItem = ({ checked, ...rest }) => {
  const { t } = useI18n()
  const styles = useStyles()

  return (
    <ActionMenuItem
      {...rest}
      left={<Icon icon={PhoneDownloadIcon} />}
      right={
        <Switch
          id={'offline-switch'}
          checked={checked}
          onClick={() => {}}
          size="small"
          classes={{
            sizeSmall: styles.sizeSmall
          }}
        />
      }
    >
      {t('action.phoneDownload')}
    </ActionMenuItem>
  )
}

export default MakeAvailableOfflineMenuItem
