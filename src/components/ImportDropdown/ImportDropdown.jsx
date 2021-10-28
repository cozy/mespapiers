import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useClient, generateWebLink } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import Konnector from 'src/assets/icons/Konnectors.svg'

const ImportDropdown = ({ label, icon, hasSteps, hideImportDropdown }) => {
  const { t } = useI18n()
  const client = useClient()
  const scannerT = useScannerI18n()
  const [showModal, setShowModal] = useState(false)

  const { currentDefinition, setIsStepperDialogOpen } = useStepperDialog()
  const konnectorCategory = currentDefinition?.connectorCriteria?.category

  const goToStore = () => {
    const webLink = generateWebLink({
      slug: 'store',
      cozyUrl: client.getStackClient().uri,
      subDomainType: client.getInstanceOptions().subdomain,
      pathname: '/',
      hash: `discover?type=konnector&category=${konnectorCategory}`
    })
    // TODO Do not use window.open for redirect, prefer use a link (href)
    window.open(webLink, '_blank')
  }

  // Avoid a potential memory leak.
  // When calling "setIsStepperDialogOpen" to "true", "Home" is unmounted to be replaced by the "Stepper".
  // The "onClose" callback of "ActionMenu" in the "Placeholder" is unmounted during the process and causes a memory leak.
  useEffect(() => {
    return () => {
      if (showModal) setIsStepperDialogOpen(true)
    }
  })

  return (
    <ActionMenu onClose={hideImportDropdown}>
      <List>
        <ListItem divider={true}>
          <IconStack
            backgroundIcon={
              <Icon
                icon={FileDuotoneIcon}
                color="var(--primaryColor)"
                size={32}
              />
            }
            foregroundIcon={
              <Icon icon={icon} color="var(--primaryColor)" size={16} />
            }
          />
          <Typography variant="h6" className="u-mh-1">
            {t('ImportDropdown.title', {
              name: scannerT(`items.${label}`)
            })}
          </Typography>
        </ListItem>
      </List>
      <List className={'u-mv-half'}>
        <ListItem
          onClick={() => hasSteps && setShowModal(true)}
          disabled={!hasSteps}
        >
          <ListItemIcon>
            <Icon icon={Camera} size={16} />
          </ListItemIcon>
          <ListItemText
            primary={t('ImportDropdown.importPicture.title')}
            secondary={t('ImportDropdown.importPicture.text')}
            ellipsis={false}
          />
        </ListItem>
        <ListItem
          onClick={konnectorCategory ? goToStore : null}
          disabled={konnectorCategory ? false : true}
        >
          <ListItemIcon>
            <Icon icon={Konnector} size={24} />
          </ListItemIcon>
          <ListItemText
            primary={t('ImportDropdown.importAuto.title')}
            secondary={t('ImportDropdown.importAuto.text')}
            ellipsis={false}
          />
        </ListItem>
      </List>
    </ActionMenu>
  )
}

ImportDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: iconPropType.isRequired,
  hasSteps: PropTypes.bool,
  hideImportDropdown: PropTypes.func
}

export default React.memo(ImportDropdown)
