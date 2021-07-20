import { useContext } from 'react'
import { DialogModalContext } from '../Contexts'

export const useDialogModalContext = () => {
  const dialogModalContext = useContext(DialogModalContext)
  if (!dialogModalContext) {
    throw new Error(
      'useDialogModalContext must be used within a DialogModalProvider'
    )
  }
  return dialogModalContext
}
