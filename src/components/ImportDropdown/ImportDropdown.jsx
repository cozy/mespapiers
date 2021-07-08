import React from 'react'

import { useClient } from 'cozy-client'
import Card from 'cozy-ui/transpiled/react/Card'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Camera from 'cozy-ui/transpiled/react/Icons/Camera'
import { useI18n } from 'cozy-ui/react/I18n'
import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker'

import { FILES_DOCTYPE } from '../../doctypes'
import Identity from '../../assets/icons/Identity.svg'
import Konnector from '../../assets/icons/Konnectors.svg'

const ImportDropdown = ({ label }) => {
  const { t } = useI18n()
  const client = useClient()

  const goToStore = () => {
    window.location = generateUniversalLink({
      cozyUrl: client.getStackClient().uri,
      slug: 'store',
      subDomainType: client.getInstanceOptions().subdomain,
      nativePath: `discover/?type=konnector&doctype=${FILES_DOCTYPE}`
    })
  }

  return (
    <Card className="u-bg-white u-p-0">
      <ListItem divider={true} className="u-flex u-flex-items-center">
        <Icon icon={Identity} size={32} />
        <Typography variant="h6" className="u-mh-1">
          {t(`items.${label}`)}
        </Typography>
      </ListItem>
      <ListItem onClick={() => goToStore()}>
        <ListItemIcon>
          <Icon icon={Konnector} size={24} />
        </ListItemIcon>
        <ListItemText
          primary={t('ImportDropdown.importAuto.title')}
          secondary={t('ImportDropdown.importAuto.text')}
          ellipsis={false}
        />
      </ListItem>
      <ListItem onClick={() => console.log('Trigger camera phone device')}>
        <ListItemIcon>
          <Icon icon={Camera} size={16} />
        </ListItemIcon>
        <ListItemText
          primary={t('ImportDropdown.importPicture.title')}
          secondary={t('ImportDropdown.importPicture.title')}
          ellipsis={false}
        />
      </ListItem>
    </Card>
  )
}

export default ImportDropdown
