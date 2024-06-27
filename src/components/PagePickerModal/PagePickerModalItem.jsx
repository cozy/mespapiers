import PropTypes from 'prop-types'
import React from 'react'

import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const PagePickerModalItem = ({
  option,
  hasMasterChoice,
  selectedChoice,
  onChange
}) => {
  const { t } = useI18n()
  const disabledChoiceOption =
    hasMasterChoice &&
    !option.master &&
    !selectedChoice.some(choice => choice.master)

  const handleChange = () => {
    onChange(option)
  }

  return (
    <ListItem
      button
      size="large"
      onClick={handleChange}
      disabled={disabledChoiceOption}
    >
      <ListItemIcon>
        <Checkbox
          checked={selectedChoice.some(choice => choice.value === option.value)}
          name={t(option.labelKey)}
          value={option.value}
        />
      </ListItemIcon>
      <ListItemText primary={t(option.labelKey)} />
    </ListItem>
  )
}

PagePickerModalItem.propTypes = {
  hasMasterChoice: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedChoice: PropTypes.arrayOf(
    PropTypes.shape({
      labelKey: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      master: PropTypes.bool
    })
  ).isRequired,
  option: PropTypes.shape({
    labelKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    master: PropTypes.bool
  }).isRequired
}
