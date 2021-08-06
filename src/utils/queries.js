import { Q, fetchPolicies } from 'cozy-client'

import { FILES_DOCTYPE } from 'src/doctypes'
import papersJSON from 'src/constants/papersDefinitions.json'

const defaultFetchPolicy = fetchPolicies.olderThan(30 * 1000)
const papersLabel = papersJSON.papersDefinitions.map(paper => paper.label)

export const getAllPapers = {
  definition: () =>
    Q(FILES_DOCTYPE)
      .where({
        'metadata.qualification': {
          label: {
            $in: papersLabel
          }
        }
      })
      .partialIndex({
        type: 'file',
        trashed: false
      })
      .indexFields(['name', 'metadata.qualification'])
      .sortBy([{ name: 'asc' }]),
  options: {
    as: `getAllPapers`,
    fetchPolicy: defaultFetchPolicy
  }
}
