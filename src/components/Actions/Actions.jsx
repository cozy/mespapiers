import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import DownloadIcon from 'cozy-ui/transpiled/react/Icons/Download'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import LinkOutIcon from 'cozy-ui/transpiled/react/Icons/LinkOut'
import ReplyIcon from 'cozy-ui/transpiled/react/Icons/Reply'

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
          {t('action.download')}
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

// TODO
export const openWith = () => {
  return {
    icon: 'openWith',
    isEnabled: false,
    action: () => undefined,
    Component: function Open({ onClick, className }) {
      const { t } = useI18n()
      return (
        <ActionMenuItem
          onClick={onClick}
          className={className}
          left={<Icon icon={LinkOutIcon} />}
        >
          {t('action.openWith')}
        </ActionMenuItem>
      )
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
