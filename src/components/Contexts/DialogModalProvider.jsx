import React, { createContext, useState } from 'react'

const DialogModalContext = createContext()

const DialogModalProvider = ({ children }) => {
  const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
  const [dialogModalTitle, setDialogModalTitle] = useState('')
  const [currentPages, setCurrentPages] = useState([])

  const dialogModal = {
    isDialogModalOpen,
    setIsDialogModalOpen,
    currentPages,
    setCurrentPages,
    dialogModalTitle,
    setDialogModalTitle
  }

  return (
    <DialogModalContext.Provider value={dialogModal}>
      {children}
    </DialogModalContext.Provider>
  )
}

export default DialogModalContext

export { DialogModalProvider }
