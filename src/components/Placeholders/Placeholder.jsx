import React, { useCallback, useState } from 'react'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import InfosBadge from 'cozy-ui/transpiled/react/InfosBadge'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Plus from 'cozy-ui/transpiled/react/Icons/Plus'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ImportDropdown from '../ImportDropdown'
import papersJSON from '../../constants/papersDefinitions.json'
import { useStepperDialogContext, useStepperContext } from '../Hooks'

const papers = papersJSON.papersDefinitions

const Placeholder = ({ placeholder, divider }) => {
  const { t } = useI18n()
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState(false)
  const { setCurrentPages, setStepperDialogTitle } = useStepperDialogContext()
  const { setMaxStep } = useStepperContext()

  const showDrawer = useCallback(() => {
    const formModel = papers.find(
      paper => paper.label && paper.label === placeholder.label
    )
    if (formModel) {
      setStepperDialogTitle(formModel.label)
      setCurrentPages(formModel.pages)
      setMaxStep(formModel.pages.length)
      setIsDrawerDisplayed(true)
    }
  }, [placeholder.label, setCurrentPages, setStepperDialogTitle, setMaxStep])
  const hideDrawer = useCallback(() => setIsDrawerDisplayed(false), [])

  return (
    <>
      <ListItem key={placeholder.label} onClick={showDrawer}>
        <ListItemIcon>
          <InfosBadge
            badgeContent={
              <Icon icon={Plus} size={10} color="var(--charcoalGrey)" />
            }
          >
            <IconStack
              backgroundClassName={'u-o-50'}
              backgroundIcon={
                <Icon
                  icon={FileDuotoneIcon}
                  color="var(--dodgerBlue)"
                  size={32}
                />
              }
              foregroundIcon={
                <Icon
                  icon={placeholder.icon}
                  color="var(--dodgerBlue)"
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
