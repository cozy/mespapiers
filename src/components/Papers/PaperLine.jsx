import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import get from 'lodash/get'

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
        p => p.label === get(paper, 'metadata.qualification.label', null)
      ),
    [paper]
  )
  const papersFeatureDate = useMemo(
    () =>
      paperDefinition &&
      paperDefinition.featureDate &&
      get(paper, `metadata.qualification[${paperDefinition.featureDate}]`),
    [paper, paperDefinition]
  )
  const date = f(papersFeatureDate || paper.created_at, 'DD/MM/YYYY')

  return (
    <>
      <ListItem
        key={paper.id}
        button
        onClick={() =>
          history.push({
            pathname: `file/${paper.id}`
          })
        }
      >
        <ListItemIcon>
          {/* TODO Improve Icon (dynamic rendering), https://github.com/cozy/mespapiers/pull/24#discussion_r686609349 */}
          <Icon icon={IconPdf} size={32} />
        </ListItemIcon>
        <ListItemText primary={paper.name} secondary={date} />
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
