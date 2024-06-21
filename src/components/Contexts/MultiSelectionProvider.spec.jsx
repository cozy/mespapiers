import { renderHook, act } from '@testing-library/react-hooks'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { MultiSelectionProvider } from 'src/components/Contexts/MultiSelectionProvider'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'

import flag from 'cozy-flags'

jest.mock('cozy-flags')
jest.mock('react-router-dom')

const setup = () => {
  flag.mockReturnValue(true)

  useLocation.mockReturnValue({ pathname: '/files/multiselect' })

  const wrapper = ({ children }) => (
    <MultiSelectionProvider>{children}</MultiSelectionProvider>
  )

  return renderHook(() => useMultiSelection(), {
    wrapper
  })
}

const fileMock01 = { _id: '01', name: 'file01' }
const fileMock02 = { _id: '02', name: 'file02' }

describe('MultiSelectionProvider', () => {
  describe('isMultiSelectionActive', () => {
    it('should remove all files to its state if isMultiSelectionActive is set to false', () => {
      const { result, rerender } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      expect(result.current.allMultiSelection).toEqual([{ file: fileMock01 }])

      // isMultiSelectionActive => false
      useLocation.mockReturnValue({ pathname: '/paper' })

      rerender()

      expect(result.current.allMultiSelection).toEqual([])
    })
  })

  describe('addMultiSelectionItems', () => {
    it('should add file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      expect(result.current.allMultiSelection).toEqual([{ file: fileMock01 }])
    })

    it('should add a second file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock02 }])
      })

      expect(result.current.allMultiSelection).toEqual([
        { file: fileMock01 },
        { file: fileMock02 }
      ])
    })

    it('should add a second file to its state even if it is the same file', () => {
      const { result } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      expect(result.current.allMultiSelection).toEqual([
        { file: fileMock01 },
        { file: fileMock01 }
      ])
    })
  })

  describe('removeMultiSelectionItemByIndex', () => {
    it('should remove specific file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock02 }])
      })

      act(() => {
        result.current.removeMultiSelectionItemByIndex(0)
      })

      expect(result.current.allMultiSelection).toEqual([{ file: fileMock02 }])
    })
  })

  describe('removeAllMultiSelectionItems', () => {
    it('should remove all files to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock01 }])
      })

      act(() => {
        result.current.addMultiSelectionItems([{ file: fileMock02 }])
      })

      act(() => {
        result.current.removeAllMultiSelectionItems()
      })

      expect(result.current.allMultiSelection).toEqual([])
    })
  })

  describe('changeCurrentMultiSelectionFile', () => {
    it('should add file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([fileMock01])
    })

    it('should add a second file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([fileMock01])

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock02)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([
        fileMock01,
        fileMock02
      ])
    })

    it('should remove the file from its state if it was already present', () => {
      const { result } = setup()

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([fileMock01])

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([])
    })
  })

  describe('removeCurrentMultiSelectionFile', () => {
    it('should remove specific file to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock02)
      })

      act(() => {
        result.current.removeCurrentMultiSelectionFile(fileMock01)
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([fileMock02])
    })
  })

  describe('removeAllCurrentMultiSelectionFiles', () => {
    it('should remove all files to its state', () => {
      const { result } = setup()

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })

      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock02)
      })

      act(() => {
        result.current.removeAllCurrentMultiSelectionFiles()
      })

      expect(result.current.currentMultiSelectionFiles).toEqual([])
    })
  })

  describe('confirmCurrentMultiSelectionFiles', () => {
    it('should move all files in currentMultiSelectionFilesState to multiSelectionFilesState', () => {
      const { result } = setup()

      // add first file to current selection
      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock01)
      })
      expect(result.current.currentMultiSelectionFiles).toEqual([fileMock01])
      expect(result.current.allMultiSelection).toEqual([])

      // add second file to current selection
      act(() => {
        result.current.changeCurrentMultiSelectionFile(fileMock02)
      })
      expect(result.current.currentMultiSelectionFiles).toEqual([
        fileMock01,
        fileMock02
      ])
      expect(result.current.allMultiSelection).toEqual([])

      // confirm current selection
      act(() => {
        result.current.confirmCurrentMultiSelectionFiles(fileMock02)
      })
      expect(result.current.currentMultiSelectionFiles).toEqual([])
      expect(result.current.allMultiSelection).toEqual([fileMock01, fileMock02])
    })
  })
})
