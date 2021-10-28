// TODO Move to cozy-client

/**
 * Whether the file is referenced by an specific doctype
 *
 * @param {IOCozyFile} file - An io.cozy.files document
 * @param {string} referencedBy - An Doctype where document is referenced
 * @returns {boolean}
 */
export const isReferencedBy = (file, referencedBy) => {
  if (file?.referenced_by?.length > 0) {
    const references = file.referenced_by
    return !!references.find(reference => reference.type === referencedBy)
  }
  return false
}
