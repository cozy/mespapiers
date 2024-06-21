import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  downloadFiles,
  forwardFile,
  makeZipFolder
} from 'src/components/Actions/utils'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import MultiselectViewActions from 'src/components/Multiselect/MultiselectViewActions'
import AppLike from 'test/components/AppLike'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

jest.mock('cozy-ui/transpiled/react/providers/Breakpoints', () => ({
  ...jest.requireActual('cozy-ui/transpiled/react/providers/Breakpoints'),
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false }))
}))
jest.mock('../../helpers/getFolderWithReference', () => ({
  ...jest.requireActual('../../helpers/getFolderWithReference'),
  __esModule: true,
  default: jest.fn(() => ({ _id: '' }))
}))
jest.mock('../Actions/utils', () => ({
  ...jest.requireActual('../Actions/utils'),
  downloadFiles: jest.fn(),
  forwardFile: jest.fn(),
  makeZipFolder: jest.fn()
}))
/* eslint-enable react/display-name */
jest.mock('src/components/Contexts/MultiSelectionProvider', () => ({
  ...jest.requireActual('src/components/Contexts/MultiSelectionProvider'),
  useMultiSelection: jest.fn()
}))
jest.mock('../../helpers/fetchCurrentUser', () => ({
  fetchCurrentUser: jest.fn(() => ({ displayName: 'Bob' }))
}))

const setup = ({
  allMultiSelection = [],
  isMobile = false,
  mockDownloadFiles = jest.fn(),
  mockForwardFiles = jest.fn(),
  mockMakeZipFolder = jest.fn(),
  mockNavigate = jest.fn(),
  mockNavigatorShareFunc
} = {}) => {
  useBreakpoints.mockReturnValue({ isMobile })
  useMultiSelection.mockReturnValue({ allMultiSelection })
  downloadFiles.mockImplementation(mockDownloadFiles)
  forwardFile.mockImplementation(mockForwardFiles)
  makeZipFolder.mockImplementation(mockMakeZipFolder)
  useNavigate.mockReturnValue(mockNavigate)
  Object.defineProperty(global.navigator, 'share', {
    value: mockNavigatorShareFunc
      ? { share: mockNavigatorShareFunc }
      : undefined,
    configurable: true
  })

  return render(
    <AppLike>
      <MultiselectViewActions />
    </AppLike>
  )
}

describe('MultiselectViewActions', () => {
  describe('Forward button', () => {
    it('should display forward Button on Mobile (if supports "navigator API")', () => {
      const mockNavigatorShareFunc = jest.fn()
      const { getByRole } = setup({
        isMobile: true,
        mockNavigatorShareFunc
      })

      expect(getByRole('button', { name: 'Send…' }))
    })

    it('should not call "forwardFile" when click forward Button if there are no files', () => {
      const mockForwardFiles = jest.fn()
      const mockNavigatorShareFunc = jest.fn()
      const { getByRole } = setup({
        allMultiSelection: [],
        mockForwardFiles,
        isMobile: true,
        mockNavigatorShareFunc
      })

      const forwardBtn = getByRole('button', { name: 'Send…' })
      fireEvent.click(forwardBtn)

      expect(mockForwardFiles).toBeCalledTimes(0)
    })

    it('should call "forwardFile" when click forward Button if there are one file', async () => {
      const mockNavigate = jest.fn()
      const mockNavigatorShareFunc = jest.fn()
      const { getByRole } = setup({
        allMultiSelection: [
          { file: { _id: '00', type: 'file', name: 'File00' } }
        ],
        isMobile: true,
        mockNavigate,
        mockNavigatorShareFunc
      })

      const forwardBtn = getByRole('button', { name: 'Send…' })
      fireEvent.click(forwardBtn)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({
          pathname: 'forward',
          search: '?fileIds=00'
        })
      })
    })
  })
})
