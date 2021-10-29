import { splitFilename } from 'cozy-client/dist/models/file'

export const formatFilename = ({
  name,
  qualificationName,
  pageName,
  username,
  date
}) => {
  const { extension } = splitFilename({
    name,
    type: 'file'
  })
  // TODO If filename contains `/`, an error is occured `status: "422", title: "Invalid Parameter"`
  const safeFileName = qualificationName.replaceAll('/', '|')
  const newFilename = `${safeFileName}${pageName ? ` - ${pageName}` : ''}${
    username ? ` - ${username}` : ''
  }${date ? ` - ${date}` : ''}`

  return `${newFilename}${extension}`
}
