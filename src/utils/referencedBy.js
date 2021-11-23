// TODO Move to cozy-client

/**
 * Whether the file is referenced by an specific doctype
 *
 * @param {IOCozyFile} file - An io.cozy.files document
 * @param {string} referencedBy - An Doctype where document is referenced
 * @returns {boolean}
 */
export const isReferencedBy = (file, referencedBy) => {
  if (file?.relationships?.referenced_by?.data?.length > 0) {
    const references = file.relationships.referenced_by.data
    return !!references.find(reference => reference.type === referencedBy)
  }
  return false
}

/**
 * Get array of referenced objects by an specific doctype
 * @param {IOCozyFile} file - An io.cozy.files document
 * @param {string} referencedBy - An Doctype where document is referenced
 * @returns {{id: string, type: string}[]}
 */
export const getReferencedBy = (file, referencedBy) => {
  if (file?.relationships?.referenced_by?.data?.length > 0) {
    const references = file.relationships.referenced_by.data
    return references.filter(reference => reference.type === referencedBy)
  }
  return []
}
