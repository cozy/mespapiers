import React, { createContext, useState } from 'react'

import papersJSON from 'src/constants/papersDefinitions.json'

const PapersDefinitionsContext = createContext()

const PapersDefinitionsProvider = ({ children }) => {
  const [papersDefinitions, setPapersDefinitions] = useState(
    papersJSON.papersDefinitions
  )

  return (
    <PapersDefinitionsContext.Provider
      value={{ papersDefinitions, setPapersDefinitions }}
    >
      {children}
    </PapersDefinitionsContext.Provider>
  )
}

export default PapersDefinitionsContext

export { PapersDefinitionsProvider }
