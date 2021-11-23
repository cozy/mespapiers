import { Q, fetchPolicies } from 'cozy-client'

const defaultFetchPolicy = fetchPolicies.olderThan(30 * 1000)

export const buildViewerFileQuery = fileId => ({
  definition: () => Q('io.cozy.files').getById(fileId),
  options: {
    as: `buildViewerFileQuery/${fileId}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const getContactByIds = ids => ({
  definition: () => Q('io.cozy.contacts').getByIds(ids),
  options: {
    as: `getContactByIds/${ids.join('')}`,
    fetchPolicy: defaultFetchPolicy
  }
})
