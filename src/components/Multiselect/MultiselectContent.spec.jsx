import { render } from '@testing-library/react'
import React from 'react'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import MultiselectContent from 'src/components/Multiselect/MultiselectContent'
import AppLike from 'test/components/AppLike'

/* eslint-disable react/display-name */
jest.mock('../Papers/PaperCardItem', () => () => (
  <div data-testid="PaperCardItem" />
))
jest.mock('cozy-ui/transpiled/react/Empty', () => () => (
  <div data-testid="Empty" />
))
/* eslint-enable react/display-name */
jest.mock('src/components/Contexts/MultiSelectionProvider', () => ({
  ...jest.requireActual('src/components/Contexts/MultiSelectionProvider'),
  useMultiSelection: jest.fn()
}))

const setup = ({ allMultiSelection }) => {
  useMultiSelection.mockReturnValue({ allMultiSelection })

  return render(
    <AppLike>
      <MultiselectContent />
    </AppLike>
  )
}

describe('MultiselectContent', () => {
  it('should not display PaperCardItem when no files are selected', () => {
    const { queryByTestId } = setup({ allMultiSelection: [] })

    expect(queryByTestId('PaperCardItem')).toBeNull()
  })

  it('should display PaperCardItem when files are selected', () => {
    const { getByTestId } = setup({
      allMultiSelection: [{ file: { _id: '123' } }]
    })

    expect(getByTestId('PaperCardItem'))
  })
})
