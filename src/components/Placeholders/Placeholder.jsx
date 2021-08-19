import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
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

import ImportDropdown from 'src/components/ImportDropdown/ImportDropdown'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import { paperDefinitionsProptypes } from 'src/components/Placeholders/PaperDefinitionsPropTypes'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import papersJSON from 'src/constants/papersDefinitions.json'

const useStyles = makeStyles({
  qualifier: { top: '70%' }
})

const isOtherPaper = label => label === 'other'

const AllPlaceholdersChoices = ({ onClick }) => {
  const classes = useStyles()
  const scannerT = useScannerI18n()

  return (
    <List>
      {papersJSON.papersDefinitions.map((placeholder, idx) => (
        <React.Fragment key={`${placeholder.label}${idx}`}>
          {!isOtherPaper(placeholder.label) && (
            <>
              <ListItem key={placeholder.label} onClick={onClick}>
                <ListItemIcon>
                  <InfosBadge
                    classes={{ qualifier: classes.qualifier }}
                    badgeContent={
                      <Icon
                        icon={Plus}
                        size={10}
                        color="var(--primaryTextColor)"
                      />
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
              {idx !== papersJSON.papersDefinitions.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}

const Placeholder = ({ placeholder, divider }) => {
  const classes = useStyles()
  const { t } = useI18n()
  const scannerT = useScannerI18n()
  const [isImportDropdownDisplayed, setIsImportDropdownDisplayed] = useState(
    false
  )
  const [isPapersLabelsList, setIsPapersLabelsList] = useState(false)
  const {
    setAllCurrentPagesDefinitions,
    setStepperDialogTitle
  } = useStepperDialogContext()

  const hideImportDropdown = useCallback(
    () => setIsImportDropdownDisplayed(false),
    []
  )
  const showImportDropdown = useCallback(() => {
    const formModel = papersJSON.papersDefinitions.find(
      paper => paper.label && paper.label === placeholder.label
    )
    if (formModel) {
      // Set Dialog modal
      setStepperDialogTitle(formModel.label)
      setAllCurrentPagesDefinitions(formModel.pages)
      // Set ActionMenu
      setIsImportDropdownDisplayed(true)
    }
  }, [placeholder.label, setAllCurrentPagesDefinitions, setStepperDialogTitle])

  const showAllPapersChoices = useCallback(
    () => setIsPapersLabelsList(true),
    []
  )
  const hideAllPapersChoices = useCallback(
    () => setIsPapersLabelsList(false),
    []
  )

  return (
    <>
      <ListItem
        key={placeholder.label}
        onClick={
          !isOtherPaper(placeholder.label)
            ? showImportDropdown
            : showAllPapersChoices
        }
      >
        <ListItemIcon>
          <InfosBadge
            classes={{ qualifier: classes.qualifier }}
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
          {isOtherPaper(placeholder.label)
            ? t(`items.${placeholder.label}`)
            : scannerT(`items.${placeholder.label}`)}
        </Typography>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}

      {isImportDropdownDisplayed && (
        <ActionMenu onClose={hideImportDropdown}>
          <ImportDropdown label={placeholder.label} icon={placeholder.icon} />
        </ActionMenu>
      )}
      {isPapersLabelsList && (
        <ActionMenu onClose={hideAllPapersChoices}>
          <AllPlaceholdersChoices onClick={showImportDropdown} />
        </ActionMenu>
      )}
    </>
  )
}

Placeholder.propTypes = {
  placeholder: paperDefinitionsProptypes.isRequired,
  divider: PropTypes.bool
}

export default Placeholder
