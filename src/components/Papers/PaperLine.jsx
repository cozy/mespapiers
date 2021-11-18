import React, { useState, useMemo, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { models, useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ActionMenu, {
  ActionMenuHeader
} from 'cozy-ui/transpiled/react/ActionMenu'
import Filename from 'cozy-ui/transpiled/react/Filename'
import FileTypePdfIcon from 'cozy-ui/transpiled/react/Icons/FileTypePdf'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import IconPdf from 'cozy-ui/transpiled/react/Icons/FileTypePdf'
import CardMedia from 'cozy-ui/transpiled/react/CardMedia'

import { usePapersDefinitions } from 'src/components/Hooks/usePapersDefinitions'
import { ActionsItems } from 'src/components/Actions/ActionsItems'
import { getThumbnailLink } from 'src/utils/getThumbnailLink'

const validPageName = page => page === 'front' || page === 'back'
const { splitFilename } = models.file

const PaperLine = ({ paper, divider, actions }) => {
  const history = useHistory()
  const { f, t } = useI18n()
  const { isMobile } = useBreakpoints()
  const actionBtnRef = useRef()
  const { papersDefinitions } = usePapersDefinitions()
  const client = useClient()
  const [imgOnError, setImgOnError] = useState(false)

  const [optionFile, setOptionFile] = useState(false)
  const paperDefinition = useMemo(
    () =>
      papersDefinitions.find(
        p => p.label === paper?.metadata?.qualification?.label
      ),
    [paper, papersDefinitions]
  )
  const papersFeatureDate = useMemo(
    () =>
      paperDefinition?.featureDate &&
      paper?.metadata?.qualification?.[paperDefinition.featureDate],
    [paper, paperDefinition]
  )
  const paperLabel = paper?.metadata?.qualification?.page
  const paperDate = f(papersFeatureDate || paper.created_at, 'DD/MM/YYYY')

  const hideActionsMenu = () => setOptionFile(false)
  const toggleActionsMenu = () => setOptionFile(prev => !prev)

  const { filename, extension } = splitFilename({
    name: paper.name,
    type: 'file'
  })

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
          {imgOnError ? (
            // TODO implement https://github.com/cozy/cozy-drive/blob/master/src/drive/web/modules/filelist/FileIconMime.jsx
            <Icon icon={IconPdf} size={32} />
          ) : (
            <CardMedia
              component={'img'}
              width={32}
              height={32}
              image={getThumbnailLink(client, paper)}
              onError={() => setImgOnError(true)}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            validPageName(paperLabel)
              ? t(`PapersList.label.${paperLabel}`)
              : paper.name
          }
          secondary={paperDate}
          className={'u-mr-1'}
        />
        <ListItemSecondaryAction>
          <IconButton
            className={'u-pr-1'}
            onClick={toggleActionsMenu}
            ref={actionBtnRef}
          >
            <Icon icon={DotsIcon} size={16} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {divider && <Divider variant="inset" component="li" />}

      {optionFile && (
        <ActionMenu onClose={hideActionsMenu} anchorElRef={actionBtnRef}>
          {isMobile && (
            <ActionMenuHeader>
              <Filename
                icon={FileTypePdfIcon}
                filename={filename}
                extension={extension}
              />
            </ActionMenuHeader>
          )}
          <ActionsItems
            actions={actions}
            file={paper}
            onClose={hideActionsMenu}
          />
        </ActionMenu>
      )}
    </>
  )
}

PaperLine.propTypes = {
  paper: PropTypes.object.isRequired,
  divider: PropTypes.bool
}

export default React.memo(PaperLine)
