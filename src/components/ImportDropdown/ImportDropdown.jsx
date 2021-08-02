import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'

import { useStepperDialogContext } from 'components/Hooks/useStepperDialogContext'
import { useScannerI18nContext } from 'components/Hooks/useScannerI18nContext'
import { getFilteredStoreUrl } from 'utils/getFilteredStoreUrl'
import Konnector from 'assets/icons/Konnectors.svg'

const ImportDropdown = ({ label, icon }) => {
  const { t } = useI18n()
  const scannerT = useScannerI18nContext()
  const client = useClient()
  const [showModal, setShowModal] = useState(false)

  const { setIsStepperDialogOpen } = useStepperDialogContext()

  const goToStore = () => {
    window.location = getFilteredStoreUrl(client)
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
    <>
      <ListItem divider={true}>
        <IconStack
          backgroundIcon={
            <Icon icon={FileDuotoneIcon} color="var(--dodgerBlue)" size={32} />
          }
          foregroundIcon={
            <Icon icon={icon} color="var(--dodgerBlue)" size={16} />
          }
        />
        <Typography variant="h6" className="u-mh-1">
          {scannerT(`Scan.items.${label}`)}
        </Typography>
      </ListItem>
      <ListItem onClick={goToStore}>
        <ListItemIcon>
          <Icon icon={Konnector} size={24} />
        </ListItemIcon>
        <ListItemText
          primary={t('importDropdown.importAuto.title')}
          secondary={t('importDropdown.importAuto.text')}
          ellipsis={false}
        />
      </ListItem>
      <ListItem onClick={() => setShowModal(true)}>
        <ListItemIcon>
          <Icon icon={Camera} size={16} />
        </ListItemIcon>
        <ListItemText
          primary={t('importDropdown.importPicture.title')}
          secondary={t('importDropdown.importPicture.text')}
          ellipsis={false}
        />
      </ListItem>
    </>
  )
}

ImportDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: iconPropType.isRequired
}

export default ImportDropdown
