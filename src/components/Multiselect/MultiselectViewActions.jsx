import React, { useState } from 'react'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import { useActions } from 'src/components/Hooks/useActions'
import MultiselectBackdrop from 'src/components/Multiselect/MultiselectBackdrop'

import ActionsBar from 'cozy-ui/transpiled/react/ActionsBar'

const MultiselectViewActions = () => {
  const { allMultiSelectionFiles } = useMultiSelection()
  const [isBackdropOpen, setIsBackdropOpen] = useState(false)

  const actions = useActions(allMultiSelectionFiles, {
    isActionBar: true,
    actionsOptions: { setIsBackdropOpen }
  })

  return (
    <>
      {isBackdropOpen && <MultiselectBackdrop />}

      <ActionsBar actions={actions} docs={allMultiSelectionFiles} />
    </>
  )
}

export default MultiselectViewActions
