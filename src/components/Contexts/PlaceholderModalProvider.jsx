import React, { createContext, useState } from 'react'

const PlaceholderModalContext = createContext()

const PlaceholderModalProvider = ({ children }) => {
  const [showPlaceholderThemesList, setShowPlaceholderThemesList] =
    useState(false)

  return (
    <PlaceholderModalContext.Provider
      value={{ showPlaceholderThemesList, setShowPlaceholderThemesList }}
    >
      {children}
    </PlaceholderModalContext.Provider>
  )
}

export default PlaceholderModalContext

export { PlaceholderModalProvider }
