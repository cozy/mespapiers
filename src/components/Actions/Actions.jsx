import React from 'react'

import { generateWebLink } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import Link from 'cozy-ui/transpiled/react/Link'
import DownloadIcon from 'cozy-ui/transpiled/react/Icons/Download'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import ReplyIcon from 'cozy-ui/transpiled/react/Icons/Reply'
import Folder from 'cozy-ui/transpiled/react/Icons/Folder'

import { isReferencedBy } from 'src/utils/isReferencedBy'
import { CONTACTS_DOCTYPE } from 'src/doctypes'
import DeleteConfirm from 'src/components/Actions/DeleteConfirm'
import MakeAvailableOfflineMenuItem from 'src/components/Actions/MakeAvailableOfflineMenuItem'
import { downloadFiles, forwardFile } from 'src/components/Actions/utils'

export const hr = () => {
  return {
    icon: 'hr',
    displayInSelectionBar: false,
    Component: function hr() {
      return <hr />
    }
  }
}

export const forward = ({ client }) => {
  return {
    icon: 'forward',
    action: (files, t) => forwardFile(client, files, t),
    Component: function Forward({ onClick, className }) {
      const { t } = useI18n()
      return (
        <ActionMenuItem
          onClick={onClick}
          className={className}
          left={<Icon icon={ReplyIcon} />}
        >
          {t('action.forward')}
        </ActionMenuItem>
      )
    }
  }
}

export const download = ({ client }) => {
  return {
    icon: 'download',
    action: files => downloadFiles(client, files),
    Component: function Download({ onClick, className }) {
      const { t } = useI18n()
      return (
        <ActionMenuItem
          onClick={onClick}
          className={className}
          left={<Icon icon={DownloadIcon} />}
        >
          {t('action.download')}
        </ActionMenuItem>
      )
    }
  }
}

// TODO
export const moreInfo = () => {
  return {
    icon: 'phone-download',
    isEnabled: false,
    Component: function MakeAvailableOfflineMenuItemInMenu({ files, ...rest }) {
      return <MakeAvailableOfflineMenuItem file={files[0]} {...rest} />
    }
  }
}

// TODO
export const offline = () => {
  return {
    icon: 'phone-download',
    isEnabled: false,
    Component: function MakeAvailableOfflineMenuItemInMenu({ files, ...rest }) {
      return <MakeAvailableOfflineMenuItem file={files[0]} {...rest} />
    }
  }
}

export const trash = ({ pushModal, popModal }) => {
  return {
    icon: 'trash',
    action: files =>
      pushModal(
        <DeleteConfirm
          files={files}
          referenced={isReferencedBy(files, CONTACTS_DOCTYPE)}
          onClose={popModal}
        />
      ),
    Component: function Trash({ onClick, className }) {
      const { t } = useI18n()

      return (
        <ActionMenuItem
          onClick={onClick}
          className={className}
          left={<Icon icon={TrashIcon} color="var(--errorColor)" />}
        >
          <Typography variant="body1" color="error">
            {t('action.trash')}
          </Typography>
        </ActionMenuItem>
      )
    }
  }
}

export const viewInDrive = ({ client }) => {
  return {
    icon: 'folder',
    Component: function ViewInDrive({ onClick, className, files }) {
      const { t } = useI18n()
      const dirId = files[0].dir_id

      const webLink = generateWebLink({
        slug: 'drive',
        cozyUrl: client.getStackClient().uri,
        subDomainType: client.getInstanceOptions().subdomain,
        pathname: '/',
        hash: `folder/${dirId}`
      })

      return (
        <ActionMenuItem
          onClick={onClick}
          className={className}
          left={<Icon icon={Folder} />}
        >
          <Link href={webLink} target="_blank" className={'u-p-0'}>
            {t('action.viewInDrive')}
          </Link>
        </ActionMenuItem>
      )
    }
  }
}
