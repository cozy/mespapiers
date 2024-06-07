import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiSelection } from 'src/components/Contexts/MultiSelectionProvider'
import MultiselectBackdrop from 'src/components/Multiselect/MultiselectBackdrop'
import useActions from 'src/components/SearchResult/useActions'

import ActionsBar from 'cozy-ui/transpiled/react/ActionsBar'

const MultiselectViewActions = () => {
  const { allMultiSelectionFiles } = useMultiSelection()
  const [isBackdropOpen, setIsBackdropOpen] = useState(false)
  const navigate = useNavigate()

  const actions = useActions(allMultiSelectionFiles, {
    isActionBar: true,
    actionsOptions: { navigate, setIsBackdropOpen }
  })

  return (
    <>
      {isBackdropOpen && <MultiselectBackdrop />}

      <ActionsBar actions={actions} docs={allMultiSelectionFiles} />
    </>
  )
}

export default MultiselectViewActions
