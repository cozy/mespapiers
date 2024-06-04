import React, { forwardRef } from 'react'

import { dehydrate } from 'cozy-client'
import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { makeZipFolder } from '../utils'

export const forwardTo = ({
  t,
  f,
  navigate,
  setIsBackdropOpen,
  isFileSharingAvailable
}) => {
  const label = t('action.forwardTo')
  const icon = 'reply'

  return {
    name: 'forwardTo',
    label,
    icon,
    disabled: docs => docs.length === 0,
    action: async (docs, { client }) => {
      if (isFileSharingAvailable) {
        // Docs hydrated with relationships can't be passed to state
        // because state does not support functions
        const dehydratedDocs = docs.map(doc => dehydrate(doc))
        navigate(`./share`, { state: { docs: dehydratedDocs } })
        return
      }

      let fileToForward

      if (docs.length === 1) {
        fileToForward = docs[0]
      } else {
        setIsBackdropOpen(true)

        fileToForward = await makeZipFolder({ client, docs, t, f })

        setIsBackdropOpen(false)
      }

      navigate(`./forward/${fileToForward._id}`)
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
