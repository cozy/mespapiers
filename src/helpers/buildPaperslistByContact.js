import { models } from 'cozy-client'
import { isReferencedById } from 'cozy-client/dist/associations'
import { CONTACTS_DOCTYPE } from 'src/doctypes'
const { getFullname } = models.contact

/**
 * @param {IOCozyFile[]} papersList - An array of IOCozyFile
 * @param {object[]} contactsList - An array of cozy contact object
 * @returns {{ contact: string, papers: IOCozyFile[] }[]}
 */
export const buildPaperslistByContact = (papersList, contactsList) => {
  const result =
    Array.isArray(contactsList) && Array.isArray(papersList)
      ? contactsList.flatMap(contact => [
          {
            contact: getFullname(contact),
            papers: papersList.filter(paper =>
              isReferencedById(paper, CONTACTS_DOCTYPE, contact._id)
            )
          }
        ])
      : []

  return result.sort((a, b) => (a.contact > b.contact ? 1 : -1))
}
