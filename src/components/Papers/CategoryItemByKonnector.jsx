import PropTypes from 'prop-types'
import React from 'react'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import styles from 'src/components/Papers/styles.styl'

import Divider from 'cozy-ui/transpiled/react/Divider'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const CategoryItemByKonnector = ({
  qualificationLabel,
  isFirst,
  isLast,
  onClick
}) => {
  const scannerT = useScannerI18n()

  return (
    <>
      {isFirst && <Divider variant="inset" component="li" />}
      <ListItem button onClick={() => onClick(qualificationLabel)}>
        <ListItemIcon>
          <div className={styles['emptyKonnectorIcon']} />
        </ListItemIcon>
        <ListItemText primary={scannerT(`items.${qualificationLabel}`)} />
        <Icon icon="right" />
      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </>
  )
}

CategoryItemByKonnector.propTypes = {
  qualificationLabel: PropTypes.string,
  isLast: PropTypes.bool,
  onClick: PropTypes.func
}

export default CategoryItemByKonnector
