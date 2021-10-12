import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import DownloadIcon from 'cozy-ui/transpiled/react/Icons/Download'
import ReplyIcon from 'cozy-ui/transpiled/react/Icons/Reply'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import RenameIcon from 'cozy-ui/transpiled/react/Icons/Rename'
import MovetoIcon from 'cozy-ui/transpiled/react/Icons/Moveto'
import QualifyIcon from 'cozy-ui/transpiled/react/Icons/Qualify'
import VersionIcon from 'cozy-ui/transpiled/react/Icons/History'

const actionsList = [
  {
    label: 'share',
    action: () => undefined,
    Component: function Share(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={ReplyIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.share')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'download',
    action: () => undefined,
    Component: function Download(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={DownloadIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.download')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'qualify',
    action: () => undefined,
    Component: function Qualify(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={QualifyIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.qualify')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'rename',
    action: () => undefined,
    Component: function Rename(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={RenameIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.rename')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'moveTo',
    action: () => undefined,
    Component: function MoveTo(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={MovetoIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.moveTo')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'version',
    action: () => undefined,
    Component: function Version(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={VersionIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.version')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'trash',
    action: () => undefined,
    Component: function Trash(props) {
      const { onClick, ...rest } = props
      const { t } = useI18n()

      return (
        <ActionMenuItem
          {...rest}
          left={<Icon icon={TrashIcon} size={16} />}
          onClick={onClick}
        >
          {t('action.trash')}
        </ActionMenuItem>
      )
    }
  },
  {
    label: 'hr',
    Component: function Hr() {
      return <hr />
    }
  }
]

export const getActions = (actionLabels = []) => {
  let actions = actionLabels.flatMap(label =>
    actionsList.filter(action => action.label === label)
  )

  return actions
}
