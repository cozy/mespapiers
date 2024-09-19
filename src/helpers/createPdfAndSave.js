import { PDFDocument } from 'pdf-lib'
import { BILLS_DOCTYPE, CONTACTS_DOCTYPE, FILES_DOCTYPE } from 'src/constants'
import { buildFilename } from 'src/helpers/buildFilename'

import { uploadFileWithConflictStrategy } from 'cozy-client/dist/models/file'
import {
  addFileToPdf,
  fileToArrayBuffer
} from 'cozy-ui/transpiled/react/ActionsMenu/Actions/helpers'

/**
 * @param {import('cozy-client/types/types').IOCozyFile} fileCreated
 * @param {import('cozy-client/types/types').DocumentCollection} fileCollection
 * @param {import('cozy-client/types/types').IOCozyContact[]} contacts
 */
export const addContactReferenceToFile = async ({
  fileCreated,
  fileCollection,
  contacts
}) => {
  const references = contacts.map(contact => ({
    _id: contact._id,
    _type: CONTACTS_DOCTYPE
  }))
  await fileCollection.addReferencedBy(fileCreated, references)
}

/**
 * Add the value of the "country" metadata according to the qualification
 *
 * @param {import('cozy-client/types/types').QualificationAttributes} qualification
 * @returns {{ country: string }}
 */
export const addCountryValueByQualification = qualification => {
  const qualificationsByCode = { FR: ['national_id_card', 'driver_license'] }

  return Object.entries(qualificationsByCode).reduce((acc, [key, val]) => {
    if (val.includes(qualification.label)) {
      return { ...acc, country: key }
    }
    return acc
  }, {})
}

/**
 * @param {object} param0
 * @param {object} param0.metadata
 * @param {import('cozy-client/types/types').QualificationAttributes} param0.qualification
 * @param {string} param0.featureDate
 * @param {string} param0.datetime
 * @returns {object}
 */
export const updateMetadata = ({
  metadata,
  qualification,
  featureDate,
  datetime
}) => {
  return {
    ...metadata,
    [FILES_DOCTYPE]: {
      ...addCountryValueByQualification(qualification),
      ...metadata[FILES_DOCTYPE],
      qualification: {
        ...qualification
      },
      datetime,
      datetimeLabel: featureDate || 'datetime'
    }
  }
}

/**
 * Convert image & pdf file to pdf & save it
 *
 * @param {{ data: object[], metadata: object }} formData
 * @param {import('cozy-client/types/types').QualificationAttributes} qualification
 * @param {import('../types').PaperDefinition} currentDefinition
 * @param {string} appFolderID
 * @param {import('cozy-client/types/CozyClient').default} client
 * @param {{t: Function, f: Function, scannerT: Function}} i18n
 * @returns {Promise<{ fileId: string, qualificationLabel: string }[]>} Return array of object with file id & qualification label to find its location
 */
export const createPdfAndSave = async ({
  formData,
  qualification,
  currentDefinition,
  appFolderID,
  client,
  i18n
}) => {
  const hasMultiplePages = formData.data.length > 1
  const isFirstDocPDF = formData.data[0].file.type === 'application/pdf'
  const isAlreadyPDFDoc = !hasMultiplePages && isFirstDocPDF

  const { t, f, scannerT } = i18n
  const { data, metadata, contacts } = { ...formData }
  const fileCollection = client.collection(FILES_DOCTYPE)
  const { featureDate, label, filenameModel } = currentDefinition

  // Created first document of PDFDocument
  let pdfDoc = isAlreadyPDFDoc ? data[0].file : await PDFDocument.create()

  const datetime = isAlreadyPDFDoc
    ? pdfDoc.lastModifiedDate.toISOString()
    : pdfDoc.getCreationDate()

  // If present, we wish to keep the value in the metadata as a priority (e.g. foreign driver's license).
  const updatedMetadata = updateMetadata({
    metadata,
    qualification,
    featureDate,
    datetime: metadata[FILES_DOCTYPE]?.featureDate ?? datetime
  })

  const date =
    updatedMetadata[FILES_DOCTYPE][featureDate] &&
    f(updatedMetadata[FILES_DOCTYPE][featureDate], 'YYYY.MM.DD')

  // If all files are to be considered as one.
  const isMultiPage = data.some(({ fileMetadata }) => fileMetadata.multipage)

  let createdFilesList = []
  for (let idx = 0; idx < data.length; idx++) {
    const { file, fileMetadata } = data[idx]
    const pdfBytes = isAlreadyPDFDoc
      ? await fileToArrayBuffer(data[0].file)
      : await addFileToPdf(pdfDoc, file)

    const paperName = buildFilename({
      filenameModel,
      metadata: updatedMetadata,
      qualification: {
        label,
        name: scannerT(`items.${label}`)
      },
      contacts,
      formatedDate: date,
      t
    })

    // If isn't multipage or the last of multipage, save file
    if (
      (!isMultiPage && !fileMetadata.page) ||
      ((isMultiPage || fileMetadata.page) && idx === data.length - 1)
    ) {
      const { data: fileCreated } = await uploadFileWithConflictStrategy(
        client,
        pdfBytes,
        {
          name: paperName,
          contentType: 'application/pdf',
          metadata: updatedMetadata[FILES_DOCTYPE],
          dirId: appFolderID,
          conflictStrategy: 'rename'
        }
      )

      await addContactReferenceToFile({ fileCreated, fileCollection, contacts })

      if (updatedMetadata[BILLS_DOCTYPE]) {
        const { data: billCreated } = await client.save({
          ...updatedMetadata[BILLS_DOCTYPE],
          // we have to duplicate `employer` into `vendor` attribute to work with Banks
          ...(updatedMetadata[BILLS_DOCTYPE].employer && {
            vendor: updatedMetadata[BILLS_DOCTYPE].employer
          }),
          _type: BILLS_DOCTYPE
        })

        await fileCollection.addReferencedBy(fileCreated, [billCreated])
      }

      createdFilesList.push({
        fileId: fileCreated._id,
        qualificationLabel: label
      })
    }
  }

  return createdFilesList
}
