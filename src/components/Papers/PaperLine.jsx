import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { Icon } from 'cozy-ui/transpiled/react'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import IconPdf from 'cozy-ui/transpiled/react/Icons/FileTypePdf'

import papersJSON from 'src/constants/papersDefinitions.json'

const PaperLine = ({ paper, divider }) => {
  const history = useHistory()
  const { f } = useI18n()
  const paperDefinition = useMemo(
    () =>
      papersJSON.papersDefinitions.find(
        p => p.label === paper?.metadata?.qualification?.label
      ),
    [paper]
  )
  const papersFeatureDate = useMemo(
    () =>
      paperDefinition?.featureDate &&
      paper?.metadata?.qualification?.[paperDefinition.featureDate],
    [paper, paperDefinition]
  )
  const paperLabel = paper?.metadata?.qualification?.pageName || paper.name
  const paperDate = f(papersFeatureDate || paper.created_at, 'DD/MM/YYYY')

  return (
    <>
      <ListItem
        key={paper.id}
        button
        onClick={() =>
          history.push({
            pathname: `/file/${paper.id}`
          })
        }
      >
        <ListItemIcon>
          <Icon icon={IconPdf} size={32} />
        </ListItemIcon>
        <ListItemText primary={paperLabel} secondary={paperDate} />
        <ListItemSecondaryAction>
          <IconButton className={'u-pr-1'}>
            <Icon icon={DotsIcon} size={16} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}
    </>
  )
}

PaperLine.propTypes = {
  paper: PropTypes.object.isRequired,
  divider: PropTypes.bool
}

export default PaperLine
