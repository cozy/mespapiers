import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

const MultiSelectionContext = createContext()

export const MultiSelectionProvider = ({ children }) => {
  const location = useLocation()
  const isMultiSelectionActive = location.pathname.includes('multiselect')
  /**
   * @type {[import('../../types').AllMultiSelection[], import('../../types').AllMultiSelectionSetter]}
   */
  const [allMultiSelection, setAllMultiSelection] = useState([])
  const [currentMultiSelectionFiles, setCurrentMultiSelectionFiles] = useState(
    []
  )
  const [selectedQualificationLabel, setSelectedQualificationLabel] =
    useState(null)

  const confirmCurrentMultiSelectionFiles = () => {
    addMultiSelectionItems(currentMultiSelectionFiles.map(file => ({ file })))
    removeAllCurrentMultiSelectionFiles()
  }

  const changeCurrentMultiSelectionFile = fileToAdd => {
    const fileAlreadySelected = currentMultiSelectionFiles.some(
      file => file._id === fileToAdd._id
    )
    if (fileAlreadySelected) removeCurrentMultiSelectionFile(fileToAdd)
    else setCurrentMultiSelectionFiles(files => [...files, fileToAdd])
  }

  const removeCurrentMultiSelectionFile = fileToRemove => {
    setCurrentMultiSelectionFiles(files => {
      return files.filter(file => file._id !== fileToRemove._id)
    })
  }

  const removeAllCurrentMultiSelectionFiles = () => {
    setCurrentMultiSelectionFiles([])
  }

  /**
   * Adds items to the multi-selection state
   * @param {{ file: import('cozy-client/types/types').IOCozyFile, page: string|null }[]} items - Files to add to the multi-selection state
   */
  const addMultiSelectionItems = items => {
    setAllMultiSelection(prev => [...prev, ...items])
  }

  /**
   * Removes a item from the multi-selection state
   * @param {number} itemIdx - Index of the item to remove
   */
  const removeMultiSelectionItemByIndex = itemIdx => {
    setAllMultiSelection(items => {
      return items.filter((_, idx) => itemIdx !== idx)
    })
  }

  const removeAllMultiSelectionItems = () => {
    setAllMultiSelection([])
  }

  useEffect(() => {
    // Resets the context by exiting the multi-selection mode
    if (!isMultiSelectionActive) {
      removeAllMultiSelectionItems()
      removeAllCurrentMultiSelectionFiles()
    }
  }, [isMultiSelectionActive])

  const value = {
    isMultiSelectionActive,
    allMultiSelection,
    addMultiSelectionItems,
    removeMultiSelectionItemByIndex,
    removeAllMultiSelectionItems,
    selectedQualificationLabel,
    setSelectedQualificationLabel,

    currentMultiSelectionFiles,
    removeAllCurrentMultiSelectionFiles,
    confirmCurrentMultiSelectionFiles,
    changeCurrentMultiSelectionFile,
    removeCurrentMultiSelectionFile
  }

  return (
    <MultiSelectionContext.Provider value={value}>
      {children}
    </MultiSelectionContext.Provider>
  )
}

export const useMultiSelection = () => {
  const multiSelection = useContext(MultiSelectionContext)
  if (!multiSelection) {
    throw new Error(
      'MultiSelectionContext must be used within a MultiSelectionProvider'
    )
  }

  return multiSelection
}
