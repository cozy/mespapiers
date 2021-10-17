import React, { useCallback, useState, Fragment, useMemo } from 'react'
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
import { PaperDefinitionsPropTypes } from 'src/constants/PaperDefinitionsPropTypes'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import papersJSON from 'src/constants/papersDefinitions.json'
import { hasNextvalue } from 'src/utils/hasNextvalue'

const useStyles = makeStyles({
  qualifier: { top: '70%' }
})

const AllPlaceholdersChoices = ({
  onClick,
  isOtherPaper,
  hideAllPapersChoices
}) => {
  const classes = useStyles()
  const scannerT = useScannerI18n()
  const hasDivider = useCallback(
    idx => hasNextvalue(idx, papersJSON.papersDefinitions),
    []
  )

  return (
    <ActionMenu onClose={hideAllPapersChoices}>
      <List>
        {papersJSON.papersDefinitions.map((placeholder, idx) => (
          <Fragment key={`${placeholder.label}${idx}`}>
            {!isOtherPaper(placeholder.label) && (
              <>
                <ListItem onClick={onClick}>
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
                {hasDivider(idx) && <Divider variant="inset" component="li" />}
              </>
            )}
          </Fragment>
        ))}
      </List>
    </ActionMenu>
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
  const { setCurrentDefinition } = useStepperDialogContext()
  const formModel = useMemo(() => {
    return papersJSON.papersDefinitions.find(
      paper => paper.label && paper.label === placeholder.label
    )
  }, [placeholder.label])
  const isOtherPaper = useCallback(label => label === 'other', [])

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

  const showAllPapersChoices = useCallback(
    () => setIsPapersLabelsList(true),
    []
  )
  const hideAllPapersChoices = useCallback(
    () => setIsPapersLabelsList(false),
    []
  )

  const handleOnClick = useCallback(() => {
    if (!isOtherPaper(placeholder.label)) showImportDropdown()
    else showAllPapersChoices()
  }, [
    isOtherPaper,
    placeholder.label,
    showAllPapersChoices,
    showImportDropdown
  ])

  const itemLabel = useMemo(() => {
    if (isOtherPaper(placeholder.label)) return t(`items.${placeholder.label}`)
    return scannerT(`items.${placeholder.label}`)
  }, [isOtherPaper, placeholder.label, scannerT, t])

  const hasSteps = useMemo(() => placeholder?.acquisitionSteps.length > 0, [
    placeholder.acquisitionSteps.length
  ])

  return (
    <>
      <ListItem onClick={handleOnClick}>
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
          {itemLabel}
        </Typography>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}

      {isImportDropdownDisplayed && (
        <ImportDropdown
          label={placeholder.label}
          icon={placeholder.icon}
          hasSteps={hasSteps}
          hideImportDropdown={hideImportDropdown}
        />
      )}
      {isPapersLabelsList && (
        <AllPlaceholdersChoices
          onClick={showImportDropdown}
          isOtherPaper={isOtherPaper}
          hideAllPapersChoices={hideAllPapersChoices}
        />
      )}
    </>
  )
}

Placeholder.propTypes = {
  placeholder: PaperDefinitionsPropTypes.isRequired,
  divider: PropTypes.bool
}

export default React.memo(Placeholder)
