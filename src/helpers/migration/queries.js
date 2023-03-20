import { Q } from 'cozy-client'

import { APP_SETTINGS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'

export const buildFilesFromDateQuery = (date, limit) => {
  return {
    definition: Q(FILES_DOCTYPE)
      .where({
        'cozyMetadata.updatedAt': { $gt: date }
      })
      .partialIndex({
        type: 'file',
        trashed: false,
        metadata: { $exists: true }
      })
      .indexFields(['type', 'cozyMetadata.updatedAt'])
      .limitBy(limit)
      .sortBy([{ type: 'asc' }, { 'cozyMetadata.updatedAt': 'asc' }])
  }
}

export const buildAppSettingQuery = () => {
  return {
    definition: Q(APP_SETTINGS_DOCTYPE).limitBy(1)
  }
}
