import { Q, fetchPolicies } from 'cozy-client'

const defaultFetchPolicy = fetchPolicies.olderThan(30 * 1000)

export const buildViewerFileQuery = fileId => ({
  definition: () =>
    Q('io.cozy.files')
      .where({
        _id: fileId
      })
      .indexFields(['_id']),
  options: {
    as: `buildViewerFileQuery:${fileId}`,
    fetchPolicy: defaultFetchPolicy
  }
})
