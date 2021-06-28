import React from 'react'

import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import { TableCell } from 'cozy-ui/transpiled/react/Table'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import People from 'cozy-ui/transpiled/react/Icons/People'
import { useI18n } from 'cozy-ui/react/I18n'

const Placeholder = ({ placeholder, divider }) => {
  const { t } = useI18n()

  return (
    <ListItem key={placeholder.label} divider={divider}>
      <TableCell>
        <IconStack
          // FIX Use variable color
          background={<Icon icon={FileDuotoneIcon} color="#297EF2" size={32} />}
          // FIX Import dynamic Icon according to "placeholder.label"
          foreground={<Icon icon={People} color="#297EF2" size={16} />}
        />
      </TableCell>
      <Typography variant="body1" color="textSecondary">
        {t(`items.${placeholder.label}`)}
      </Typography>
    </ListItem>
  )
}

export default Placeholder
