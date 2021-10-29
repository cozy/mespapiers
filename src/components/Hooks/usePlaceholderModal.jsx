import { useContext } from 'react'
import PlaceholderModalProvider from 'src/components/Contexts/PlaceholderModalProvider'

export const usePlaceholderModal = () => {
  const placeholdermodalContext = useContext(PlaceholderModalProvider)
  if (!placeholdermodalContext) {
    throw new Error(
      'usePlaceholderModal must be used within a PlaceholderModalProvider'
    )
  }
  return placeholdermodalContext
}
