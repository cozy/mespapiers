import PropTypes from 'prop-types'
import React from 'react'
import { useScannerI18n } from 'src/components/Contexts/ScannerI18nProvider'
import { attrsProptypesOption } from 'src/components/ModelSteps/widgets/proptypes'

import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Radio from 'cozy-ui/transpiled/react/Radios'

const RadioAdapterItem = ({ onClick, option, value }) => {
  const scannerT = useScannerI18n()

  const isChecked = optionValue => {
    return optionValue === value
  }

  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <Radio
          inputProps={{ 'aria-label': scannerT(option.label) }}
          value={option.value}
          checked={isChecked(option.value)}
        />
      </ListItemIcon>
      <ListItemText
        primary={<div value={option.value}>{scannerT(option.label)}</div>}
        data-testid={`RadioAdapterItem-${option.value}`}
      />
    </ListItem>
  )
}

RadioAdapterItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  option: attrsProptypesOption.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default RadioAdapterItem
