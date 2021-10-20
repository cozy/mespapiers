import React, { useState, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'
import Card from 'cozy-ui/transpiled/react/Card'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ImportDropdown from 'src/components/ImportDropdown/ImportDropdown'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'
import { findPlaceholdersByQualification } from 'src/utils/getPlaceholders'

const PlaceholdersList = ({ title, onBack, currentQualifItems }) => {
  const { t } = useI18n()
  const [isImportDropdownDisplayed, setIsImportDropdownDisplayed] = useState(
    false
  )
  const [placeholderSelected, setPlaceholderSelected] = useState(null)

  const scannerT = useScannerI18n()
  const allPlaceholders = useMemo(
    () => findPlaceholdersByQualification(currentQualifItems),
    [currentQualifItems]
  )
  const { setCurrentDefinition } = useStepperDialogContext()
  const hideImportDropdown = useCallback(
    () => setIsImportDropdownDisplayed(false),
    []
  )

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
    <FixedDialog
      onClose={onBack}
      transitionDuration={0}
      title={t('PlaceholdersList.title', {
        name: ` - ${scannerT(`items.${title}`)}`
      })}
      open={true}
      content={
        <>
          <Grid container spacing={1}>
            {allPlaceholders.map((placeholder, idx) => {
              const stepsExists = placeholder.acquisitionSteps.length > 0

              return (
                <Grid
                  key={idx}
                  item
                  xs={6}
                  onClick={() => selectPlaceholder(placeholder, stepsExists)}
                >
                  <Card
                    className={cx('u-flex u-flex-items-center u-ph-half', {
                      ['u-ov-hidden']: stepsExists,
                      ['u-o-50']: !stepsExists
                    })}
                  >
                    <IconStack
                      backgroundIcon={
                        <Icon
                          icon={FileDuotoneIcon}
                          color="var(--primaryColor)"
                          size={24}
                        />
                      }
                      foregroundIcon={
                        <Icon
                          icon={placeholder.icon}
                          color="var(--primaryColor)"
                          size={14}
                        />
                      }
                    />
                    <Typography
                      variant={'body2'}
                      className={'u-flex-wrap u-pl-half'}
                    >
                      {scannerT(`items.${placeholder.label}`)}
                    </Typography>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          {isImportDropdownDisplayed && (
            <ActionMenu onClose={hideImportDropdown}>
              <ImportDropdown
                label={placeholderSelected.label}
                icon={placeholderSelected.icon}
                hasSteps={placeholderSelected?.acquisitionSteps.length > 0}
              />
            </ActionMenu>
          )}
        </>
      }
    />
  )
}

PlaceholdersList.propTypes = {
  title: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  currentQualifItems: PropTypes.array.isRequired
}

export default PlaceholdersList
