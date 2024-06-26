import mergeWith from 'lodash/mergeWith'
import React, { forwardRef } from 'react'
import { handleFileForwarding } from 'src/components/Actions/handleFileForwarding'
import { normalizeFilesWithPage } from 'src/components/Actions/utils'

import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const mergeById = (doc, multiselect) => {
  if (doc._id === multiselect?.file?._id) {
    return multiselect
  } else {
    return normalizeFilesWithPage([doc])[0]
  }
}

export const forwardTo = ({
  t,
  navigate,
  allMultiSelection = [],
  pushModal,
  popModal
}) => {
  const label = t('action.forwardTo')
  const icon = 'reply'

  return {
    name: 'forwardTo',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: (docs, { client }) => {
      const fromMultiSelection = allMultiSelection.length > 0
      const normalizedDocs = fromMultiSelection
        ? mergeWith(docs, allMultiSelection, mergeById)
        : normalizeFilesWithPage(docs)

      handleFileForwarding({
        client,
        filesWithPage: normalizedDocs,
        fromMultiSelection,
        pushModal,
        popModal,
        navigate,
        t
      })
    },
    Component:
      // eslint-disable-next-line react/display-name
      forwardRef((props, ref) => {
        return (
          <ActionsMenuItem {...props} ref={ref}>
            <ListItemIcon>
              <Icon icon={icon} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ActionsMenuItem>
        )
      })
  }
}
