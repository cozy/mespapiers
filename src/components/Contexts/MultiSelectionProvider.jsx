import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

const MultiSelectionContext = createContext()

export const MultiSelectionProvider = ({ children }) => {
  const location = useLocation()
  const isMultiSelectionActive = location.pathname.includes('multiselect')
  const [allMultiSelectionFiles, setAllMultiSelectionFiles] = useState([])
  const [currentMultiSelectionFiles, setCurrentMultiSelectionFiles] = useState(
    []
  )
  const [selectedQualificationLabel, setSelectedQualificationLabel] =
    useState(null)

  const confirmCurrentMultiSelectionFiles = () => {
    addMultiSelectionFiles(currentMultiSelectionFiles)
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

  const addMultiSelectionFiles = filesToAdd => {
    setAllMultiSelectionFiles(files => [...files, ...filesToAdd])
  }

  const removeMultiSelectionFile = fileToRemoveIndex => {
    setAllMultiSelectionFiles(files => {
      return files.filter((_, idx) => fileToRemoveIndex !== idx)
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
