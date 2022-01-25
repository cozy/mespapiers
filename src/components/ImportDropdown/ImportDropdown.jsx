import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useClient, generateWebLink } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'
import IconStack from 'cozy-ui/transpiled/react/IconStack'
import FileDuotoneIcon from 'cozy-ui/transpiled/react/Icons/FileDuotone'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import PhoneUpload from 'cozy-ui/transpiled/react/Icons/PhoneUpload'
import { ActionMenuHeader } from 'cozy-ui/transpiled/react/ActionMenu'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

import { useStepperDialog } from 'src/components/Hooks/useStepperDialog'
import { useScannerI18n } from 'src/components/Hooks/useScannerI18n'
import { usePlaceholderModal } from 'src/components/Hooks/usePlaceholderModal'
import Konnector from 'src/assets/icons/Konnectors.svg'

const ImportDropdown = ({ label, icon, hasSteps }) => {
  const { t } = useI18n()
  const client = useClient()
  const scannerT = useScannerI18n()

  const { setShowPlaceholderThemesList } = usePlaceholderModal()
  const {
    currentDefinition,
    setIsStepperDialogOpen,
    setAlreadyScan
  } = useStepperDialog()
  const konnectorCategory = currentDefinition?.connectorCriteria?.category
  const konnectorName = currentDefinition?.connectorCriteria?.name

  const goToStore = () => {
    let hash
    if (konnectorName) hash = `discover/${konnectorName}`
    else hash = `discover?type=konnector&category=${konnectorCategory}`
    const webLink = generateWebLink({
      slug: 'store',
      cozyUrl: client.getStackClient().uri,
      subDomainType: client.getInstanceOptions().subdomain,
      pathname: '/',
      hash
    })
    // TODO Do not use window.open for redirect, prefer use a link (href)
    window.open(webLink, '_blank')
  }

  const handleClick = useCallback(
    ({ alreadyScan }) => {
      if (hasSteps) {
        setShowPlaceholderThemesList(false)
        setIsStepperDialogOpen(true)
        setAlreadyScan(alreadyScan)
      }
    },
    [
      hasSteps,
      setAlreadyScan,
      setIsStepperDialogOpen,
      setShowPlaceholderThemesList
    ]
  )

  return (
    <>
      <ActionMenuHeader>
        <Media>
          <Img>
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
          </Img>
          <Bd className="u-ml-1">
            <Typography variant="h6">
              {t('ImportDropdown.title', {
                name: scannerT(`items.${label}`)
              })}
            </Typography>
          </Bd>
        </Media>
      </ActionMenuHeader>
      <List className={'u-mv-half'}>
        <ListItem
          onClick={() => handleClick({ alreadyScan: false })}
          disabled={!hasSteps}
        >
          <ListItemIcon>
            <Icon icon={Camera} size={16} />
          </ListItemIcon>
          <ListItemText
            primary={t('ImportDropdown.scanPicture.title')}
            secondary={t('ImportDropdown.scanPicture.text')}
            ellipsis={false}
          />
        </ListItem>
        <ListItem
          onClick={() => handleClick({ alreadyScan: true })}
          disabled={!hasSteps}
        >
          <ListItemIcon>
            <Icon icon={PhoneUpload} size={16} />
          </ListItemIcon>
          <ListItemText
            primary={t('ImportDropdown.importPicture.title')}
            secondary={t('ImportDropdown.importPicture.text')}
            ellipsis={false}
          />
        </ListItem>
        <ListItem
          onClick={konnectorCategory || konnectorName ? goToStore : null}
          disabled={konnectorCategory || konnectorName ? false : true}
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
    </>
  )
}

ImportDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: iconPropType.isRequired,
  hasSteps: PropTypes.bool
}

export default React.memo(ImportDropdown)
