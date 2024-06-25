import React from 'react'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { useActions } from 'src/components/Hooks/useActions'

import ActionsBar from 'cozy-ui/transpiled/react/ActionsBar'

const MultiselectViewActions = () => {
  const { allMultiSelection } = useMultiSelection()
  const allMultiSelectionFiles = allMultiSelection.map(({ file }) => file)

  const actions = useActions(allMultiSelectionFiles, {
    isActionBar: true
  })

  return <ActionsBar actions={actions} docs={allMultiSelectionFiles} />
}

export default MultiselectViewActions
