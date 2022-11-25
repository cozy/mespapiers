import { Q } from 'cozy-client'

import { FILES_DOCTYPE, TRIGGERS_DOCTYPE } from 'src/constants'

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
