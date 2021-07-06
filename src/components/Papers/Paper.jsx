import React from 'react'

import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Icon } from 'cozy-ui/transpiled/react'
import IconPdf from 'cozy-ui/transpiled/react/Icons/FileTypePdf'

// TODO Improve Icon
const Paper = ({ paper, divider }) => {
  return (
    <>
      <ListItem key={paper.name}>
        <ListItemIcon>
          <Icon icon={IconPdf} size={32} />
        </ListItemIcon>
        <Typography variant="body1">{paper.name}</Typography>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}
    </>
  )
}

export default Paper
