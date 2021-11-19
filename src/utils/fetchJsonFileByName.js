import log from 'cozy-logger'
import { Q, fetchPolicies } from 'cozy-client'

import { FILES_DOCTYPE } from 'src/doctypes'

export const fetchJsonFileByName = async (client, name) => {
  try {
    const fileColl = client.collection(FILES_DOCTYPE)
    const queryDef = Q(FILES_DOCTYPE)
      .where({ name: name })
      .partialIndex({ trashed: false })
      .indexFields(['name'])

    const { data } = await client.query(queryDef, {
      as: `getPaperConfigFileDef`,
      fetchPolicy: fetchPolicies.noFetch()
    })

    const dataBin = await fileColl.fetchFileContentById(data[0]._id)
    const dataJSON = await dataBin.json()

    return dataJSON
  } catch (error) {
    log('error', `Can't fetch data for file ${name}: ${error}`)
    return null
  }
}
