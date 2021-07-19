import React, { createContext, useState } from 'react'

const DialogModalContext = createContext()

const DialogModalProvider = ({ children }) => {
  const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
  const [dialogModalLabel, setDialogModalLabel] = useState('')
  const dialogModal = {
    isDialogModalOpen,
    setIsDialogModalOpen,
    dialogModalLabel,
    setDialogModalLabel
  }

  return (
    <DialogModalContext.Provider value={dialogModal}>
      {children}
    </DialogModalContext.Provider>
  )
}

export default DialogModalContext

export { DialogModalProvider }
