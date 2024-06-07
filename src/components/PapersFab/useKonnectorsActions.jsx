import { useLocation, useParams } from 'react-router-dom'
import { importAuto, scanPicture } from 'src/components/Actions/Items'
import { usePapersDefinitions } from 'src/components/Contexts/PapersDefinitionsProvider'
import { findPlaceholderByLabelAndCountry } from 'src/helpers/findPlaceholders'

import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'

const useKonnectorsActions = ({
  placeholder,
  redirectPaperCreation,
  setShowKonnectorMenu
}) => {
  const { search } = useLocation()
  const { qualificationLabel } = useParams()
  const { papersDefinitions } = usePapersDefinitions()

  const country = new URLSearchParams(search).get('country')
  const paperDefinition =
    placeholder ||
    findPlaceholderByLabelAndCountry(
      papersDefinitions,
      qualificationLabel,
      country
    )[0]

  const actions = makeActions([importAuto, scanPicture], {
    paperDefinition,
    scanPictureOnclick: () => redirectPaperCreation(paperDefinition),
    importAutoOnclick: () => setShowKonnectorMenu(false)
  })

  return actions
}

export default useKonnectorsActions
