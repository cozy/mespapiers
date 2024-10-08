import {
  FILES_DOCTYPE,
  TRIGGERS_DOCTYPE,
  CONTACTS_DOCTYPE,
  APP_SETTINGS_DOCTYPE,
  KONNECTORS_DOCTYPE,
  ACCOUNTS_DOCTYPE,
  APPS_REGISTRY_DOCTYPE
} from 'src/constants'

import { Q, fetchPolicies } from 'cozy-client'
import {
  KNOWN_DATE_METADATA_NAMES,
  KNOWN_INFORMATION_METADATA_NAMES
} from 'cozy-client/dist/models/paper'

const defaultFetchPolicy = fetchPolicies.olderThan(86_400_000) // 24 hours

export const buildTriggerByIdQuery = triggerId => {
  return {
    definition: Q(TRIGGERS_DOCTYPE).getById(triggerId)
  }
}

export const buildTriggerByServiceNameQuery = serviceName => {
  return {
    definition: Q(TRIGGERS_DOCTYPE)
      .where({
        'message.name': serviceName
      })
      .indexFields(['message.name'])
  }
}

export const buildAllFilesToNotifyQuery = () => {
  return {
    definition: Q(FILES_DOCTYPE)
      .partialIndex({
        type: 'file',
        trashed: false,
        'metadata.qualification.label': {
          $exists: true
        },
        'metadata.notifiedAt': {
          $exists: false
        }
      })
      .indexFields(['metadata.qualification.label'])
      .select([
        'name',
        'metadata',
        'metadata.qualification.label',
        'metadata.notifiedAt',
        'referenced_by',
        'created_at',
        'updated_at',
        'type',
        'trashed'
      ])
      .limitBy(1000)
  }
}

export const buildFilesQueryWithQualificationLabel = () => {
  const select = [
    'name',
    'mime',
    'referenced_by',
    ...KNOWN_DATE_METADATA_NAMES.map(x => `metadata.${x}`),
    ...KNOWN_INFORMATION_METADATA_NAMES.map(x => `metadata.${x}`),
    'metadata.noticePeriod',
    'metadata.hideExpirationAlert',
    'metadata.qualification.label',
    'metadata.title',
    'metadata.version',
    'cozyMetadata.createdByApp',
    'created_at',
    'dir_id',
    'updated_at',
    'type',
    'trashed'
  ]

  return {
    definition: () =>
      Q(FILES_DOCTYPE)
        .where({
          type: 'file',
          trashed: false
        })
        .partialIndex({
          'metadata.qualification.label': {
            $exists: true
          },
          'cozyMetadata.createdByApp': { $exists: true }
        })
        .select(select)
        .limitBy(1000)
        .indexFields(['type', 'trashed']),
    options: {
      as: `${FILES_DOCTYPE}/metadata_qualification_label`,
      fetchPolicy: defaultFetchPolicy
    }
  }
}

export const buildFilesQueryByLabel = label => ({
  definition: () =>
    Q(FILES_DOCTYPE)
      .where({
        'metadata.qualification': {
          label: label
        }
      })
      .partialIndex({
        type: 'file',
        trashed: false,
        'cozyMetadata.createdByApp': { $exists: true }
      })
      .indexFields(['created_at', 'metadata.qualification'])
      .sortBy([{ created_at: 'desc' }]),
  options: {
    as: `${FILES_DOCTYPE}/${label}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const getAppSettings = {
  definition: () => Q(APP_SETTINGS_DOCTYPE),
  options: {
    as: APP_SETTINGS_DOCTYPE,
    fetchPolicy: fetchPolicies.noFetch()
  }
}

export const buildContactsQueryByIds = (ids = [], enabled = true) => ({
  definition: () => Q(CONTACTS_DOCTYPE).getByIds(ids),
  options: {
    as: `${CONTACTS_DOCTYPE}/${ids.join('')}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})

export const buildFileQueryById = id => ({
  definition: Q(FILES_DOCTYPE).getById(id),
  options: {
    as: `${FILES_DOCTYPE}/${id}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildFileQueryByIds = ids => ({
  definition: Q(FILES_DOCTYPE).getByIds(ids),
  options: {
    as: `${FILES_DOCTYPE}/${ids.join('')}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildTriggersQueryByKonnectorSlug = (slug, enabled) => ({
  definition: () =>
    Q(TRIGGERS_DOCTYPE)
      .where({
        'message.konnector': slug
      })
      .indexFields(['message.konnector']),
  options: {
    as: `${TRIGGERS_DOCTYPE}/slug/${slug}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})

export const buildKonnectorsQueryById = (id, enabled = true) => ({
  definition: () => Q(KONNECTORS_DOCTYPE).getById(id),
  options: {
    as: `${KONNECTORS_DOCTYPE}/id/${id}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})

export const buildKonnectorsQueryByQualificationLabels = (
  labels,
  enabled = true
) => ({
  definition: () =>
    Q(KONNECTORS_DOCTYPE)
      .where({ qualification_labels: { $in: labels } })
      .indexFields(['qualification_labels']),
  options: {
    as: `${KONNECTORS_DOCTYPE}/qualificationLabels/${JSON.stringify(labels)}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})

export const buildAccountsQueryBySlugs = (slugs, enabled = true) => ({
  definition: () =>
    Q(ACCOUNTS_DOCTYPE)
      .where({
        account_type: { $in: slugs }
      })
      .indexFields(['account_type']),
  options: {
    as: `${ACCOUNTS_DOCTYPE}/slugs/${JSON.stringify(slugs)}`,
    fetchPolicy: defaultFetchPolicy,
    enabled
  }
})

export const queryAccounts = {
  definition: () => Q(ACCOUNTS_DOCTYPE),
  options: {
    as: `accounts`,
    fetchPolicy: defaultFetchPolicy
  }
}

export const buildAppRegistryQueryBySlug = slug => {
  return {
    definition: () => Q(APPS_REGISTRY_DOCTYPE).getById(slug),
    options: {
      as: `${APPS_REGISTRY_DOCTYPE}/${slug}`,
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  }
}
