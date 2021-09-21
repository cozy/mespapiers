import { Q, fetchPolicies } from 'cozy-client'

import { FILES_DOCTYPE } from 'src/doctypes'
import papersJSON from 'src/constants/papersDefinitions.json'

const defaultFetchPolicy = fetchPolicies.olderThan(30 * 1000)
const papersLabel = papersJSON.papersDefinitions.map(paper => paper.label)

export const getAllQualificationLabel = {
  definition: () =>
    Q(FILES_DOCTYPE)
      .where({
        'metadata.qualification.label': {
          $in: papersLabel
        }
      })
      // TODO When "select" could be used
      // .select(['metadata.qualification.label'])
      .partialIndex({
        type: 'file',
        trashed: false
      })
      .indexFields(['metadata.qualification.label']),
  options: {
    as: `getAllQualificationLabelqq`,
    fetchPolicy: defaultFetchPolicy
  }
}

export const getPapersByLabel = label => ({
  definition: () =>
    Q(FILES_DOCTYPE)
      .where({
        'metadata.qualification': {
          label: label
        }
      })
      .partialIndex({
        type: 'file',
        trashed: false
      })
      .indexFields(['name', 'metadata.qualification'])
      .sortBy([{ name: 'desc' }]),
  options: {
    as: `getPapersByLabel:${label}`,
    fetchPolicy: defaultFetchPolicy
  }
})
