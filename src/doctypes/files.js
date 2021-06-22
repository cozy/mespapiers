export const FILES_DOCTYPE = 'io.cozy.files'

// queries for CozyClient

export const filesQuery = client => client.find(FILES_DOCTYPE)
