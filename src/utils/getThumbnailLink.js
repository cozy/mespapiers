/**
 * @param {CozyClient} client - CozyClient instance
 * @param {IOCozyFile} file - An io.cozy.files document
 * @returns {Promise<String>} - URL of file thumbnail
 */
export const getThumbnailLink = (client, file) => {
  const { uri } = client.getClient()
  let url = null

  switch (file.class) {
    case 'image':
      url = `${uri}${file.links.small}`
      break
    case 'pdf':
      url = `${uri}${file.links.icon}`
      break
    default:
      url = null
      break
  }

  return url
}
