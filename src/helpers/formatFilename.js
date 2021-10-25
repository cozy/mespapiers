import { CozyFile } from 'cozy-doctypes'

export const formatFilename = ({
  name,
  qualificationName,
  pageName,
  username,
  date
}) => {
  const { extension } = CozyFile.splitFilename({
    name,
    type: 'file'
  })
  const newFilename = `${qualificationName}${pageName ? ` - ${pageName}` : ''}${
    username ? ` - ${username}` : ''
  }${date ? ` - ${date}` : ''}`

  return `${newFilename}${extension}`
}
