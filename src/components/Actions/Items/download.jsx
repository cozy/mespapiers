import mergeWith from 'lodash/mergeWith'
import React, { forwardRef } from 'react'
import { handleFileDownloading } from 'src/components/Actions/handleFileDownloading'
import { normalizeFilesWithPage } from 'src/components/Actions/utils'
import withLocales from 'src/locales/withLocales'

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

export const download = ({
  t,
  showAlert,
  navigate,
  pushModal,
  popModal,
  allMultiSelection = [],
  isMultiSelectionActive
}) => {
  const label = t('action.download')
  const icon = 'download'

  return {
    name: 'download',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: async (docs, { client }) => {
      const fromMultiSelection = allMultiSelection.length > 0
      const normalizedDocs =
        allMultiSelection.length > 0
          ? mergeWith(docs, allMultiSelection, mergeById)
          : normalizeFilesWithPage(docs)

      await handleFileDownloading({
        client,
        filesWithPage: normalizedDocs,
        fromMultiSelection,
        showAlert,
        t,
        pushModal,
        popModal
      })
      isMultiSelectionActive && navigate('..')
    },
    Component: withLocales(
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
    )
  }
}
