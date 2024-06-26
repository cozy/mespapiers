import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

const MultiSelectionContext = createContext()

export const MultiSelectionProvider = ({ children }) => {
  const location = useLocation()
  const isMultiSelectionActive = location.pathname.includes('multiselect')
  /**
   * @type {[import('../../types').AllMultiSelection[], import('../../types').AllMultiSelectionSetter]}
   */
  const [allMultiSelectionFiles, setAllMultiSelectionFiles] = useState([])
  const [currentMultiSelectionFiles, setCurrentMultiSelectionFiles] = useState(
    []
  )
  const [selectedQualificationLabel, setSelectedQualificationLabel] =
    useState(null)

  const confirmCurrentMultiSelectionFiles = () => {
    addMultiSelectionFiles(currentMultiSelectionFiles.map(file => ({ file })))
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
  const addMultiSelectionFiles = items => {
    setAllMultiSelectionFiles(prev => [...prev, ...items])
  }

  /**
   * Removes a file from the multi-selection state
   * @param {number} fileToRemoveIndex - Index of the file to remove
   */
  const removeMultiSelectionFile = fileToRemoveIndex => {
    setAllMultiSelectionFiles(items => {
      return items.filter((_, idx) => fileToRemoveIndex !== idx)
    })
  }

  const removeAllMultiSelectionFiles = () => {
    setAllMultiSelectionFiles([])
  }

  useEffect(() => {
    // Resets the context by exiting the multi-selection mode
    if (!isMultiSelectionActive) {
      removeAllMultiSelectionFiles()
      removeAllCurrentMultiSelectionFiles()
    }
  }, [isMultiSelectionActive])

  const value = {
    isMultiSelectionActive,
    allMultiSelectionFiles,
    addMultiSelectionFiles,
    removeMultiSelectionFile,
    removeAllMultiSelectionFiles,
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
