import React, { createContext, useState, useCallback, useContext } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([])
  const pushModal = useCallback(modal => {
    setModalStack(prev => [...prev, modal])
  }, [])
  const popModal = useCallback(() => {
    setModalStack(prev => prev.slice(1))
  }, [])

  return (
    <ModalContext.Provider value={{ modalStack, pushModal, popModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const modalContext = useContext(ModalContext)
  if (!modalContext) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return modalContext
}

export const ModalStack = () => {
  const { modalStack } = useModal()

  if (modalStack.length === 0) return null

  return modalStack[0]
}
