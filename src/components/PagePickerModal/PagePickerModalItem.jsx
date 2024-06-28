import PropTypes from 'prop-types'
import React from 'react'

import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const PagePickerModalItem = ({ option, selectedFaces, onChange }) => {
  const { t } = useI18n()

  const handleChange = () => {
    onChange(option)
  }

  return (
    <ListItem button size="large" onClick={handleChange}>
      <ListItemIcon>
        <Checkbox
          checked={selectedFaces.some(face => face.name === option.name)}
          name={option.name}
        />
      </ListItemIcon>
      <ListItemText primary={t(option.labelKey)} />
    </ListItem>
  )
}

PagePickerModalItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedFaces: PropTypes.arrayOf(
    PropTypes.shape({
      labelKey: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  option: PropTypes.shape({
    labelKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}
