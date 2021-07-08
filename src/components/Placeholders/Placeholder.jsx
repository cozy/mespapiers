import React, { useState } from 'react'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import InfosBadge from 'cozy-ui/transpiled/react/InfosBadge'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Plus from 'cozy-ui/transpiled/react/Icons/Plus'
import { useI18n } from 'cozy-ui/react/I18n'
import { getCssVariableValue } from 'cozy-ui/transpiled/react/utils/color'

import ImportDropdown from '../ImportDropdown'

const Placeholder = ({ placeholder, divider }) => {
  const { t } = useI18n()
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState(false)

  const showDrawer = () => setIsDrawerDisplayed(true)
  const hideDrawer = () => setIsDrawerDisplayed(false)

  return (
    <>
      <ListItem key={placeholder.label} onClick={showDrawer}>
        <ListItemIcon>
          <InfosBadge
            badgeContent={
              <Icon
                icon={Plus}
                size={10}
                color={getCssVariableValue('charcoalGrey')}
              />
            }
          >
            <IconStack
              background={
                <Icon
                  icon={FileDuotoneIcon}
                  color={getCssVariableValue('dodgerBlue')}
                  size={32}
                />
              }
              foreground={
                <Icon
                  icon={placeholder.icon}
                  color={getCssVariableValue('dodgerBlue')}
                  size={16}
                />
              }
            />
          </InfosBadge>
        </ListItemIcon>
        <Typography variant="body1" color="textSecondary">
          {t(`items.${placeholder.label}`)}
        </Typography>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}

      {isDrawerDisplayed && (
        <ActionMenu onClose={hideDrawer}>
          <ImportDropdown label={placeholder.label} icon={placeholder.icon} />
        </ActionMenu>
      )}
    </>
  )
}

export default Placeholder
