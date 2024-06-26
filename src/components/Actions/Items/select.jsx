import React, { forwardRef } from 'react'
import { handleFileSelecting } from 'src/components/Actions/handleFileSelecting'
import { normalizeFilesWithPage } from 'src/components/Actions/utils'
import withLocales from 'src/locales/withLocales'

import { generateWebLink, useClient } from 'cozy-client'
import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const select = ({
  hideActionsMenu,
  addMultiSelectionItems,
  pushModal,
  popModal,
  t
}) => {
  return {
    name: 'select',
    action: (docs, { client }) => {
      hideActionsMenu && hideActionsMenu()
      handleFileSelecting({
        client,
        filesWithPage: normalizeFilesWithPage(docs),
        addMultiSelectionItems,
        pushModal,
        popModal,
        t
      })
    },
    Component: withLocales(
      // eslint-disable-next-line react/display-name
      forwardRef((props, ref) => {
        const { t } = useI18n()
        const client = useClient()

        const webLink = generateWebLink({
          slug: 'mespapiers',
          cozyUrl: client.getStackClient().uri,
          subDomainType: client.getInstanceOptions().subdomain,
          pathname: '/',
          hash: '/paper/multiselect'
        })

        return (
          <ActionsMenuItem {...props} ref={ref} component="a" href={webLink}>
            <ListItemIcon>
              <Icon icon="select-all" />
            </ListItemIcon>
            <ListItemText primary={t('action.select')} />
          </ActionsMenuItem>
        )
      })
    )
  }
}
