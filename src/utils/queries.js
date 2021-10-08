import { Q, fetchPolicies } from 'cozy-client'

import { FILES_DOCTYPE, CONTACTS_DOCTYPE } from 'src/doctypes'
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
      .select(['metadata.qualification.label'])
      .partialIndex({
        type: 'file',
        trashed: false
      })
      .indexFields(['metadata.qualification.label'])
      .sortBy([{ 'metadata.qualification.label': 'desc' }]),
  options: {
    as: `getAllQualificationLabel`,
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
      .sortBy([{ name: 'asc' }]),
  options: {
    as: `getPapersByLabel:${label}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const getContactById = id => ({
  definition: () =>
    Q(CONTACTS_DOCTYPE)
      .where({
        _id: id
      })
      .indexFields(['_id']),
  options: {
    as: `getContactById`,
    fetchPolicy: defaultFetchPolicy
  }
})
