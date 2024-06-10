import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PapersFab from 'src/components/PapersFab/PapersFab'
import AppLike from 'test/components/AppLike'

import flag from 'cozy-flags'

jest.mock('cozy-client/dist/models/applications', () => ({
  isInstalled: jest.fn()
}))
jest.mock('cozy-flags')
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ qualificationLabel: '' })),
    useNavigate: jest.fn()
  }
})

const setup = ({
  withQualificationLabelParam,
  mockNavigate = jest.fn(),
  isFlag = true
} = {}) => {
  flag.mockReturnValue(isFlag)
  if (withQualificationLabelParam) {
    useParams.mockReturnValue({ qualificationLabel: 'tax_notice' })
  }

  useNavigate.mockImplementation(() => mockNavigate)

  return render(
    <AppLike>
      <PapersFab data-testid="PapersFab" />
    </AppLike>
  )
}

describe('PapersFabWrapper', () => {
  describe('On home page', () => {
    it('should navigate to the create modale if click on child', () => {
      const mockNavigate = jest.fn()
      const { getByRole } = setup({ mockNavigate })

      const btn = getByRole('button')
      fireEvent.click(btn)

      expect(mockNavigate).toBeCalledTimes(1)
      expect(mockNavigate).toBeCalledWith('/paper/create')
    })
  })

  describe('On papers list', () => {
    it('should not navigate to the create modale if click on child', () => {
      const mockNavigate = jest.fn()
      const { getByRole } = setup({
        withQualificationLabelParam: true,
        mockNavigate
      })

      const btn = getByRole('button')
      fireEvent.click(btn)

      expect(mockNavigate).toBeCalledTimes(0)
    })
    it('should display ActionMenuWrapper with additionnal action if click on child', () => {
      const { getByRole, getByText } = setup({
        withQualificationLabelParam: true
      })

      const btn = getByRole('button')
      fireEvent.click(btn)

      expect(getByText('Add a document')).toBeInTheDocument()
      expect(getByText('Add Tax notice')).toBeInTheDocument()
    })
  })
})
