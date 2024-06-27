/**
 * Triggers the download of a blob by the browser
 * @param {string} filename - Name of the file to download
 * @param {Blob} blob - Blob of the file
 */
export const downloadBlob = (filename, blob) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
