import { Q } from 'cozy-client'

import { FILES_DOCTYPE } from 'root/doctypes'

export const getAllPapers = {
  definition: () =>
    Q(FILES_DOCTYPE).where({
      type: 'file',
      trashed: false,
      'metadata.qualificationsAttributes': {
        $exists: true
      }
    }),
  options: {
    as: `getAllPapers`
  }
}
