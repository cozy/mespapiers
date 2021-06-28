import { Q } from 'cozy-client'

import { FILES_DOCTYPE } from '../doctypes'

export const queryAllPapers = {
  definition: () =>
    Q(FILES_DOCTYPE).where({
      type: 'file',
      trashed: false,
      [`metadata.qualificationsAttributes`]: true
    }),
  options: {
    as: `allPapers`
  }
}
