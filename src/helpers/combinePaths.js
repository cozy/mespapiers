/**
 * Combine two paths into one, making sure there are no double slashes.
 * @param {string} path1 - The first path.
 * @param {string} path2 - The second path.
 * @returns {string} The combined path.
 */
export const combinePaths = (path1, path2) => {
  let firstPath = path1
  let secondPath = path2

  if (path1.endsWith('/')) {
    firstPath = path1.slice(0, -1)
  }

  if (path2.startsWith('/')) {
    secondPath = path2.slice(1)
  }

  return `${firstPath}/${secondPath}`
}
