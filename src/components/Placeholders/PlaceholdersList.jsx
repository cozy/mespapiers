import React, { useState, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './PlaceholdersList.styl'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon, {
  smallSize,
  largeSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import ImportDropdown from 'src/components/ImportDropdown/ImportDropdown'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { findPlaceholdersByQualification } from 'src/helpers/findPlaceholders'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const PlaceholdersList = ({ currentQualifItems }) => {
  const [isImportDropdownDisplayed, setIsImportDropdownDisplayed] =
    useState(false)
  const [placeholderSelected, setPlaceholderSelected] = useState(null)
  const { papersDefinitions } = usePapersDefinitions()

  const scannerT = useScannerI18n()
  const allPlaceholders = useMemo(
    () =>
      findPlaceholdersByQualification(papersDefinitions, currentQualifItems),
    [currentQualifItems, papersDefinitions]
  )
  const { setCurrentDefinition } = useStepperDialog()
  const hideImportDropdown = useCallback(() => {
    setIsImportDropdownDisplayed(false)
    setPlaceholderSelected(undefined)
  }, [])

  const shouldDisplayImportDropdown = () => {
    return !!isImportDropdownDisplayed && !!placeholderSelected
  }
  const showImportDropdown = useCallback(() => {
    const formModel = allPlaceholders.find(
      paper => paper.label && paper.label === placeholderSelected.label
    )
    if (formModel) {
      // Set Dialog modal
      setCurrentDefinition(formModel)
      // Set ActionMenu
      setIsImportDropdownDisplayed(true)
    }
  }, [allPlaceholders, placeholderSelected, setCurrentDefinition])

  const selectPlaceholder = useCallback((placeholder, stepsExists) => {
    stepsExists ? setPlaceholderSelected(placeholder) : undefined
  }, [])

  useEffect(() => {
    if (placeholderSelected) showImportDropdown()
  }, [placeholderSelected, showImportDropdown])

  return (
    <>
      <List className="placeholder-list">
        {allPlaceholders.map((placeholder, idx) => {
          const stepsExists =
            placeholder.acquisitionSteps.length > 0 ||
            placeholder.connectorCriteria

          return (
            <ListItem
              button
              disableGutters
              key={idx}
              onClick={() => selectPlaceholder(placeholder, stepsExists)}
              className={cx({
                ['u-o-50']: !stepsExists
              })}
            >
              <ListItemIcon>
                <IconStack
                  backgroundIcon={
                    <Icon
                      icon={FileDuotoneIcon}
                      color="var(--primaryColor)"
                      size={largeSize}
                    />
                  }
                  foregroundIcon={
                    <Icon
                      icon={placeholder.icon}
                      color="var(--primaryColor)"
                      size={smallSize}
                    />
                  }
                />
              </ListItemIcon>
              <ListItemText primary={scannerT(`items.${placeholder.label}`)} />
            </ListItem>
          )
        })}
      </List>
      <ActionMenuImportDropdown
        isOpened={shouldDisplayImportDropdown()}
        placeholderSelected={placeholderSelected}
        hideImportDropdown={hideImportDropdown}
      />
    </>
  )
}

const ActionMenuImportDropdown = ({
  isOpened,
  placeholderSelected,
  hideImportDropdown
}) => {
  return isOpened ? (
    <ActionMenu onClose={hideImportDropdown} className={'action-menu'}>
      <ImportDropdown
        label={placeholderSelected.label}
        icon={placeholderSelected.icon}
        hasSteps={placeholderSelected?.acquisitionSteps.length > 0}
        hideImportDropdown={hideImportDropdown}
      />
    </ActionMenu>
  ) : null
}

PlaceholdersList.propTypes = {
  currentQualifItems: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      subjects: PropTypes.arrayOf(PropTypes.string),
      purpose: PropTypes.string,
      sourceCategory: PropTypes.string,
      sourceSubCategory: PropTypes.string
    })
  ).isRequired
}

export default PlaceholdersList
