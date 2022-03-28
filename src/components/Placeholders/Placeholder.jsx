import React, { useCallback, useState, Fragment, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import InfosBadge from 'cozy-ui/transpiled/react/InfosBadge'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Plus from 'cozy-ui/transpiled/react/Icons/Plus'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { PaperDefinitionsPropTypes } from 'src/constants/PaperDefinitionsPropTypes'
import ActionMenuImportDropdown from 'src/components/Placeholders/ActionMenuImportDropdown'

const Placeholder = ({ placeholder, divider }) => {
  const scannerT = useScannerI18n()
  const actionBtnRef = useRef()
  const { papersDefinitions } = usePapersDefinitions()
  const [isImportDropdownDisplayed, setIsImportDropdownDisplayed] =
    useState(false)
  const { setCurrentDefinition } = useStepperDialog()
  const formModel = useMemo(() => {
    return papersDefinitions.find(
      paper => paper.label && paper.label === placeholder.label
    )
  }, [papersDefinitions, placeholder.label])

  const hideImportDropdown = useCallback(
    () => setIsImportDropdownDisplayed(false),
    []
  )
  const showImportDropdown = useCallback(() => {
    if (formModel) {
      // Set Dialog modal
      setCurrentDefinition(formModel)
      // Set ActionMenu
      setIsImportDropdownDisplayed(true)
    }
  }, [formModel, setCurrentDefinition])

  return (
    <>
      <ListItem button onClick={showImportDropdown} ref={actionBtnRef}>
        <ListItemIcon>
          <InfosBadge
            badgeContent={
              <Icon icon={Plus} size={10} color="var(--primaryTextColor)" />
            }
          >
            <IconStack
              backgroundClassName={'u-o-50'}
              backgroundIcon={
                <Icon
                  icon={FileDuotoneIcon}
                  color="var(--primaryColor)"
                  size={32}
                />
              }
              foregroundIcon={
                <Icon
                  icon={placeholder.icon}
                  color="var(--primaryColor)"
                  size={16}
                />
              }
            />
          </InfosBadge>
        </ListItemIcon>
        <Typography variant="body1" color="textSecondary">
          {scannerT(`items.${placeholder.label}`)}
        </Typography>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}

      <ActionMenuImportDropdown
        isOpened={isImportDropdownDisplayed}
        placeholder={placeholder}
        onClose={hideImportDropdown}
        anchorElRef={actionBtnRef}
      />
    </>
  )
}

Placeholder.propTypes = {
  placeholder: PaperDefinitionsPropTypes.isRequired,
  divider: PropTypes.bool
}

export default React.memo(Placeholder)
