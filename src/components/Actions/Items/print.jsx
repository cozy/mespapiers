import React, { forwardRef } from 'react'
import { makeBase64FromFile } from 'src/components/ModelSteps/helpers'

import { fetchBlobFileById, isFile } from 'cozy-client/dist/models/file'
import minilog from 'cozy-minilog'
import { makePdfBlob } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/helpers'
import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const log = minilog('Actions/print')

export const print = ({ t, isMultiSelectionActive, navigate }) => {
  const icon = 'printer'
  const label = t('action.print')

  return {
    name: 'print',
    icon,
    label,
    disabled: docs => docs.length === 0,
    displayCondition: docs => docs.every(doc => isFile(doc)),
    action: async (docs, { client, webviewIntent }) => {
      // If 2 sides of the same doc are selected, the doc must not be displayed twice in the print preview.
      const uniqueDocs = docs.reduce((acc, doc) => {
        if (!acc.some(item => item.id === doc.id)) {
          acc.push(doc)
        }
        return acc
      }, [])
      const isSingleDoc = uniqueDocs.length === 1
      const firstDoc = uniqueDocs[0]

      try {
        // in flagship app
        if (webviewIntent) {
          const blob = isSingleDoc
            ? await fetchBlobFileById(client, firstDoc._id)
            : await makePdfBlob(client, uniqueDocs)
          const base64 = await makeBase64FromFile(blob)

          return webviewIntent.call('print', base64)
        }

        // not in flagship app
        let docUrl = ''
        if (isSingleDoc) {
          docUrl = await client
            .collection('io.cozy.files')
            .getDownloadLinkById(firstDoc._id, firstDoc.name)
        } else {
          const blob = await makePdfBlob(client, uniqueDocs)
          docUrl = URL.createObjectURL(blob)
        }

        /*
          We need to write window.open in a setTimeout because
          Safari does not allow window.open in an async function.
        */
        setTimeout(() => {
          window.open(docUrl, '_blank')
        })
      } catch (error) {
        log.error(
          `Error trying to print document ${
            webviewIntent ? 'inside flagship appp' : 'outside flagship app'
          }: ${JSON.stringify(error)}`
        )
      } finally {
        isMultiSelectionActive && navigate('..')
      }
    },
    // eslint-disable-next-line react/display-name
    Component: forwardRef((props, ref) => {
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
