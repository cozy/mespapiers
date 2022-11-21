import { CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'

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
