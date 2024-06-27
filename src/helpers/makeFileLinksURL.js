/**
 * @param {object} options
 * @param {import('cozy-client/types/CozyClient').default} options.client - Cozy client
 * @param {import('cozy-client/types/types').IOCozyFile} options.file - File to get the link from
 * @param {string} options.linkType - Type of link to get (tiny, small, etc.)
 */
export const makeFileLinksURL = ({ client, file, linkType }) => {
  if (!file.links?.[linkType]) return null

  return `${client.getStackClient().uri}${file.links[linkType]}`
}
