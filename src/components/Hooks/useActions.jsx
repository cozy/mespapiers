import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  copyReminderContent,
  download,
  editContact,
  forwardTo,
  rename,
  select,
  trash,
  open,
  viewInDrive
} from 'src/components/Actions/Items'
import { useModal } from 'src/components/Contexts/ModalProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'

import { isFile, isNote } from 'cozy-client/dist/models/file'
import { useWebviewIntent } from 'cozy-intent'
import {
  makeActions,
  print,
  divider
} from 'cozy-ui/transpiled/react/ActionsMenu/Actions'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const useActions = (docs, { isActionBar, actionsOptions } = {}) => {
  const webviewIntent = useWebviewIntent()
  const { t, f } = useI18n()
  const { pushModal, popModal } = useModal()
  const { showAlert } = useAlert()
  const { addMultiSelectionFiles } = useMultiSelection()
  const [isPrintAvailable, setIsPrintAvailable] = useState(false)
  const navigate = useNavigate()

  const hasNoteDoc =
    docs.length > 0 && docs.every(doc => isFile(doc))
      ? docs.length > 0 && docs.every(doc => isNote(doc))
      : false

  const isPDFDoc = docs.every(doc => doc.mime === 'application/pdf')

  const actions = useMemo(
    () =>
      makeActions(
        [
          !isActionBar && hasNoteDoc && copyReminderContent,
          !isActionBar && select,
          !isActionBar && divider,
          forwardTo,
          download,
          isPrintAvailable && isPDFDoc && print,
          !isActionBar && open,
          !isActionBar && divider,
          !isActionBar && rename,
          !isActionBar && hasNoteDoc && editContact,
          !isActionBar && divider,
          !isActionBar && viewInDrive,
          !isActionBar && divider,
          trash
        ],
        {
          ...actionsOptions,
          t,
          f,
          navigate,
          addMultiSelectionFiles,
          pushModal,
          popModal,
          showAlert
        }
      ),
    [
      actionsOptions,
      isActionBar,
      hasNoteDoc,
      isPrintAvailable,
      isPDFDoc,
      t,
      f,
      navigate,
      addMultiSelectionFiles,
      pushModal,
      popModal,
      showAlert
    ]
  )

  useEffect(() => {
    const init = async () => {
      const isAvailable =
        (await webviewIntent?.call('isAvailable', 'print')) ?? true

      setIsPrintAvailable(isAvailable)
    }

    init()
  }, [webviewIntent])

  return docs.length > 0 && docs.every(doc => !isFile(doc))
    ? undefined
    : actions
}
