import get from 'lodash/get'

import papersJSON from '../constants/papersDefinitions.json'

export const getPlaceholders = (papers = []) => {
  return papersJSON.papersDefinitions.filter(
    paperDefinition =>
      !papers.some(
        paper =>
          get(paper, 'metadata.qualification.label') === paperDefinition.label
      ) && paperDefinition.featuredPlaceholder
  )
}
