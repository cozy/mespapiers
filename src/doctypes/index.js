import { FILES_DOCTYPE } from 'src/doctypes/files'

export const CONTACTS_DOCTYPE = 'io.cozy.contacts'

// the documents schema, necessary for CozyClient
export default {
  contacts: {
    doctype: CONTACTS_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  files: {
    doctype: FILES_DOCTYPE,
    attributes: {},
    relationships: {}
  }
}

// export all doctypes for the application
export * from './files'
export * from './apps'
