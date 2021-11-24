/**
 * @typedef {object} BuildPaperNameParam
 * @property {string} qualificationName - Name of the paper qualification
 * @property {string} [pageName] - Name of page (eg Front)
 * @property {string} [fullname] - Fullname of contact
 * @property {string} [formatedDate] - Date already formated
 */

/**
 * Builded Paper name with qualification name & without use filename original
 * @param {BuildPaperNameParam} opts
 * @returns {string} Paper name with PDF extension
 */
export const buildFilename = opts => {
  /*
    Calling the stack's file creation method would trigger a `status: "422", title: "Invalid Parameter"` error if filename contains`/`.
    So we need to remove any occurrence of this character from the filename.
  */
  const safeFileName = opts.qualificationName.replaceAll('/', '_')

  const pageName = opts.pageName ? ` - ${opts.pageName}` : ''
  const fullname = opts.fullname ? ` - ${opts.fullname}` : ''
  const formatedDate = opts.formatedDate ? ` - ${opts.formatedDate}` : ''

  return `${safeFileName}${pageName}${fullname}${formatedDate}.pdf`
}
