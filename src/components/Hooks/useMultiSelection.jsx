import { useContext } from 'react'
import MultiSelectionContext from 'src/components/Contexts/MultiSelectionProvider'

export const useMultiSelection = () => {
  const multiSelection = useContext(MultiSelectionContext)
  if (!multiSelection) {
    throw new Error(
      'MultiSelectionContext must be used within a MultiSelectionProvider'
    )
  }

  return multiSelection
}
