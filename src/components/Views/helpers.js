import { filterWithRemaining } from 'src/helpers/filterWithRemaining'
import { getAllPdfPages } from 'src/helpers/getPdfPage'

import { getAccountName } from 'cozy-client/dist/models/account'

export const makePapers = (
  papersDefinitionsLabels,
  filesWithQualificationLabel
) =>
  filesWithQualificationLabel?.filter(file =>
    papersDefinitionsLabels.includes(file?.metadata?.qualification?.label)
  ) || []

export const makeQualificationLabelWithoutFiles = (
  papersDefinitionsLabels,
  papers
) =>
  papersDefinitionsLabels.filter(
    paperDefinitionLabel =>
      !papers.some(
        paper => paper.metadata?.qualification?.label === paperDefinitionLabel
      )
  )

export const makeKonnectorsAndQualificationLabelWithoutFiles = (
  konnectors,
  qualificationLabelWithoutFiles
) =>
  konnectors.map(konnector => ({
    konnector,
    konnectorQualifLabelsWithoutFile:
      konnector.qualification_labels?.filter(qualificationLabel =>
        qualificationLabelWithoutFiles.includes(qualificationLabel)
      ) || []
  }))

/**
 * Groups together accounts that have files and those that don't
 * @param {import('cozy-client/types/types').AccountsDocument[]} accounts - Array of accounts
 * @param {import('cozy-client/types/types').IOCozyFile[]} files - Array of IOCozyFile
 * @returns {{ accountsWithFiles: import('cozy-client/types/types').AccountsDocument[], accountsWithoutFiles: import('cozy-client/types/types').AccountsDocument[] }} - Accounts with files and accounts without files
 */
export const makeAccountsByFiles = (accounts, files) => {
  const hasFile = account => {
    return files?.some(
      file =>
        file.cozyMetadata.sourceAccountIdentifier === getAccountName(account)
    )
  }

  // if (!accounts) return { accountsWithFiles: [], accountsWithoutFiles: [] }

  const {
    itemsFound: accountsWithFiles,
    remainingItems: accountsWithoutFiles
  } = filterWithRemaining(accounts, hasFile)

  return { accountsWithFiles, accountsWithoutFiles }
}

/**
 * @param {object} konnectorCriteria - Option of the papersDefinition
 * @param {string} konnectorCriteria.name - Name of the konnector
 * @param {string} konnectorCriteria.category - Category of the konnector
 * @param {string} konnectorCriteria.qualificationLabel - Qualification label of the konnector
 * @param {string} qualificationLabel - Qualification label of the paperDefinition
 * @returns {string} - URLSearchParams
 */
export const buildURLSearchParamsForInstallKonnectorFromIntent = (
  konnectorCriteria,
  qualificationLabel
) => {
  const paramsObj = {
    // Useful for redirecting on the route(harvest) opening the login modal
    redirectAfterInstall: `/paper/files/${qualificationLabel}/harvest/`,
    ...(konnectorCriteria.name && {
      slug: konnectorCriteria.name
    }),
    ...(konnectorCriteria.category && {
      category: konnectorCriteria.category
    }),
    ...(konnectorCriteria.qualificationLabel && {
      qualificationLabel: konnectorCriteria.qualificationLabel
    })
  }

  return new URLSearchParams(paramsObj).toString()
}

/**
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - CozyClient instance
 * @param {import('cozy-client/types/types').IOCozyFile} param.file - io.cozy.file
 * @param {boolean} param.isMultipage - Is the file multipage
 * @returns {Promise<{ file: File, stepIndex: number, fileMetadata: { multipage: boolean } }[]>} - Array of file, stepIndex and fileMetadata
 */
export const makeDataOfEditFormData = async ({
  client,
  ioCozyFile,
  isMultipage
}) => {
  const fileBinaries = await getAllPdfPages({
    client,
    file: ioCozyFile
  })

  return fileBinaries.map((fileBin, index) => {
    const newFile = new File([fileBin], ioCozyFile.name, {
      type: ioCozyFile.mime
    })
    if (ioCozyFile.metadata?.paperProps?.isBlank != null) {
      newFile.isBlank = ioCozyFile.metadata.paperProps.isBlank
    }
    return {
      file: newFile,
      stepIndex: index,
      fileMetadata: { multipage: isMultipage }
    }
  })
}
