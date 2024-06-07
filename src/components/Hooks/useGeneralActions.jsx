import { useLocation, useParams } from 'react-router-dom'
import {
  createPaper,
  createPaperByQualificationLabel
} from 'src/components/Actions/Items'

import { useClient } from 'cozy-client'
import { makeActions } from 'cozy-ui/transpiled/react/ActionsMenu/Actions'

export const useGeneralActions = ({
  setShowGeneralMenu,
  setShowKonnectorMenu,
  redirectPaperCreation
}) => {
  const client = useClient()
  const { qualificationLabel } = useParams()
  const { search } = useLocation()

  const country = new URLSearchParams(search).get('country')

  const showKonnectorMenuOrRedirect = paperDefinition => {
    if (paperDefinition.konnectorCriteria) {
      setShowKonnectorMenu(true)
    } else {
      redirectPaperCreation(paperDefinition)
    }
    setShowGeneralMenu(false)
  }

  const actionList = qualificationLabel
    ? [createPaperByQualificationLabel, createPaper]
    : []
  const actionOptions = {
    client,
    hideActionsMenu: () => setShowGeneralMenu(false),
    showKonnectorMenuOrRedirect,
    qualificationLabel,
    country
  }

  const actions = makeActions(actionList, actionOptions)

  return actions
}
