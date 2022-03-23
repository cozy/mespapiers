import React, { useCallback, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Placeholder from 'src/components/Placeholders/Placeholder'
import ActionMenuImportDropdown from 'src/components/Placeholders/ActionMenuImportDropdown'
import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'

const useStyles = makeStyles({
  root: { textIndent: '1rem' }
})

const FeaturedPlaceholdersList = ({ featuredPlaceholders }) => {
  const [placeholder, setPlaceholder] = useState(null)
  const actionBtnRef = useRef()
  const classes = useStyles()
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const [isImportDropdownDisplayed, setIsImportDropdownDisplayed] =
    useState(false)
  const hideImportDropdown = useCallback(
    () => setIsImportDropdownDisplayed(false),
    []
  )
  const { setCurrentDefinition } = useStepperDialog()

  const { papersDefinitions } = usePapersDefinitions()

  const showImportDropdown = placeholder => {
    const formModel = papersDefinitions.find(
      paper => paper.label && paper.label === placeholder.label
    )

    if (formModel) {
      // Set Dialog modal
      setCurrentDefinition(formModel)
      // Set ActionMenu
      setIsImportDropdownDisplayed(true)
    }

    setPlaceholder(placeholder)
  }

  return (
    <List>
      {featuredPlaceholders.length > 0 && (
        <ListSubheader classes={isMobile && classes}>
          {t('FeaturedPlaceholdersList.subheader')}
        </ListSubheader>
      )}
      <div className={'u-pv-half'}>
        {featuredPlaceholders.map((placeholder, idx) => (
          <Placeholder
            key={idx}
            ref={actionBtnRef}
            placeholder={placeholder}
            divider={idx !== featuredPlaceholders.length - 1}
            onClick={showImportDropdown}
          />
        ))}
        <ActionMenuImportDropdown
          isOpened={isImportDropdownDisplayed}
          placeholder={placeholder}
          onClose={hideImportDropdown}
          anchorElRef={actionBtnRef}
        />
      </div>
    </List>
  )
}

FeaturedPlaceholdersList.propTypes = {
  featuredPlaceholders: PropTypes.arrayOf(PropTypes.object)
}

export default FeaturedPlaceholdersList
