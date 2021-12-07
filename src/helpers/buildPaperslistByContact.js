import { models } from 'cozy-client'
import { isReferencedById } from 'cozy-client'
import { CONTACTS_DOCTYPE } from 'src/doctypes'
const { getDisplayName } = models.contact

const DEFAULT_MAX_DISPLAY = 3

/**
 * @typedef {object} BuildPaperslistByContactParam
 * @property {object[]} papersList - Array of IOCozyFile
 * @property {object[]} contactsList - Array of cozy contact object
 * @property {Paper[]} [papersDefinitions=[]] Array of Papers
 * @property {string} [currentFileCategory=''] - Category of qualification
 */

/**
 * @param {BuildPaperslistByContactParam} param
 * @returns {{ contact: string, papers: {maxDisplay: number, list: IOCozyFile[]} }[]}
 */
export const buildPaperslistByContact = ({
  papersList,
  contactsList,
  papersDefinitions = [],
  currentFileCategory = ''
}) => {
  let result = []
  if (Array.isArray(contactsList) && Array.isArray(papersList)) {
    const currentDef = papersDefinitions.find(
      paperDef => paperDef.label === currentFileCategory
    )
    result = contactsList.flatMap(contact => [
      {
        contact: getDisplayName(contact),
        papers: {
          maxDisplay: currentDef?.maxDisplay || DEFAULT_MAX_DISPLAY,
          list: papersList.filter(paper =>
            isReferencedById(paper, CONTACTS_DOCTYPE, contact._id)
          )
        }
      }
    ])
  }

  return result.sort((a, b) => (a.contact > b.contact ? 1 : -1))
}
