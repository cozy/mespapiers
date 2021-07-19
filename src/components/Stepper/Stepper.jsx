import React, { useState, useEffect, useContext } from 'react'

import useCycle from 'cozy-ui/transpiled/react/hooks/useCycle'

import { DialogModalContext } from '../Contexts'
import papersJSON from '../../constants/papersDefinitions.json'

const papers = papersJSON.papersDefinitions

const Stepper = () => {
  const [currentPages, setCurrentPages] = useState([])
  const { dialogModalLabel } = useContext(DialogModalContext)

  useEffect(() => {
    const formModel = papers.find(paper => paper.label === dialogModalLabel)
    if (formModel) setCurrentPages(formModel.pages)
  }, [dialogModalLabel])

  const [index] = useCycle(1, 1, currentPages.length)

  return currentPages.map((page, i) => (
    <React.Fragment key={i}>
      {page.pageNumber === index && <>{/* Dialog component */}</>}
    </React.Fragment>
  ))
}

export default Stepper
