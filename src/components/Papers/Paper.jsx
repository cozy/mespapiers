import React from 'react'

import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import { Avatar } from 'cozy-ui/transpiled/react/Avatar'
import { TableCell } from 'cozy-ui/transpiled/react/Table'
import Typography from 'cozy-ui/transpiled/react/Typography'

// TODO
const Paper = ({ paper, divider }) => {
  return (
    <ListItem divider={divider}>
      <TableCell>
        <Avatar size="small" />
      </TableCell>
      <Typography variant="body1">{paper.name}</Typography>
    </ListItem>
  )
}

export default Paper
