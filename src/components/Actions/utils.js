// TODO Move to cozy-client (files model)

import { FILES_DOCTYPE, JOBS_DOCTYPE } from 'src/constants'
import { downloadBlob } from 'src/helpers/downloadBlob'
import getOrCreateAppFolderWithReference from 'src/helpers/getFolderWithReference'
import { getPdfPage } from 'src/helpers/getPdfPage'
import { handleConflictFilename } from 'src/helpers/handleConflictFilename'

import { isReferencedBy } from 'cozy-client'
import { getDisplayName } from 'cozy-client/dist/models/contact'
import { splitFilename } from 'cozy-client/dist/models/file'
import { getSharingLink } from 'cozy-client/dist/models/sharing'

export const isAnyFileReferencedBy = (files, doctype) => {
  for (let i = 0, l = files.length; i < l; ++i) {
    if (isReferencedBy(files[i], doctype)) return true
  }
  return false
}

const isMissingFileError = error => error.status === 404

const downloadFileError = error => {
  return isMissingFileError(error)
    ? 'common.downloadFile.error.missing'
    : 'common.downloadFile.error.offline'
}

/**
 * @param {import('../../types').FileWithPage & {t: Function}} param
 * @returns {string} - Final name of the file
 */
export const makeFilenameWithPage = ({ file, page, t }) => {
  if (!page) {
    return file.name
  }
  const { filename, extension } = splitFilename(file)
  return `${filename}_${t(`Multiselect.page.${page}`)}${extension}`
}

const convertPage = page => {
  if (page === null) {
    return undefined
  }
  return page === 'front' ? 1 : 2
}

/**
 * Create a zip folder with the list of files and save it in a desired folder in Drive
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - Instance of CozyClient
 * @param {import('../../types').FileWithPage[]} param.filesWithPage - List of files to zip with their page
 * @param {string} param.zipFolderName - Desired name of the Zip folder
 * @param {string} param.dirId - Id of the destination folder of the zip
 * @param {Function} param.t - i18n function
 * @returns {Promise<string>} - Final name of the zip folder
 */
export const createZipFolderJob = async ({
  client,
  filesWithPage,
  zipFolderName,
  dirId,
  t
}) => {
  const opts = Object.fromEntries(
    filesWithPage.map(({ file, page }) => {
      const filename = makeFilenameWithPage({ file, page, t })
      return [filename, { id: file._id, page: convertPage(page) }]
    })
  )
  const zipName = await handleConflictFilename(client, dirId, zipFolderName)
  const zipData = {
    files: opts,
    dir_id: dirId,
    filename: zipName
  }

  const jobCollection = client.collection(JOBS_DOCTYPE)
  await jobCollection.create('zip', zipData, {}, true)

  return zipName
}

/**
 *
 * @param {object} param
 * @param {import('cozy-client/types/CozyClient').default} param.client - Instance of CozyClient
 * @param {import('cozy-client/types/types').IOCozyContact} param.currentUser - Current user
 * @param {import('../../types').FileWithPage[]} param.filesWithPage - List of files to zip with their page
 * @param {Function} param.t - i18n function
 * @param {Function} param.f - date formatting function
 * @returns
 */
export const makeZipFolder = async ({
  client,
  currentUser,
  filesWithPage,
  t,
  f
}) => {
  const defaultZipFolderName = t('Multiselect.folderZipName', {
    contactName: getDisplayName(currentUser),
    date: f(Date.now(), 'yyyy.LL.dd')
  })

  const { _id: parentFolderId } = await getOrCreateAppFolderWithReference(
    client,
    t
  )

  const zipName = await createZipFolderJob({
    client,
    filesWithPage,
    zipFolderName: defaultZipFolderName,
    dirId: parentFolderId,
    t
  })

  // Should we reject at some time here ?
  return new Promise(resolve => {
    client.plugins.realtime.subscribe('created', FILES_DOCTYPE, file => {
      if (file && file.name === zipName && file.dir_id === parentFolderId) {
        resolve(file)
      }
    })
  })
}

/**
 * forwardFile - Triggers the download of one or multiple files by the browser
 * @param {object} options
 * @param {import('cozy-client/types/CozyClient').default} options.client
 * @param {import('cozy-client/types/types').IOCozyFile[]} options.files One or more files to download
 * @param {Function} options.t i18n function
 * @param {string} options.ttl Time to live of the sharing link
 * @param {string} options.password Password of the sharing link
 * @param {Function} options.showAlert - Function to display an alert
 */
export const forwardFile = async ({
  client,
  files,
  t,
  ttl,
  password,
  showAlert
}) => {
  try {
    // We currently support only one file at a time
    const file = files[0]
    const url = await getSharingLink(client, [file._id], { ttl, password })
    const isZipFile = file.class === 'zip'
    const shareData = {
      title: t('viewer.shareData.title', {
        name: file.name,
        smart_count: isZipFile ? 2 : 1
      }),
      text: t('viewer.shareData.text', {
        name: file.name,
        smart_count: isZipFile ? 2 : 1
      }),
      url
    }
    navigator.share(shareData)
  } catch (error) {
    showAlert({
      message: t('viewer.shareData.error'),
      severity: 'error',
      variant: 'filled'
    })
  }
}

/**
 * @param {import('../../types').FileWithPage[]} filesWithPage - List of files to zip with their page
 * @returns {{ids: string[], pages: {id: string, page: string}[]}}
 */
export const makeCreateArchiveLinkByIdsOptions = filesWithPage => {
  return filesWithPage.reduce(
    (acc, { file, page }) => {
      const res = {
        ...acc,
        pages: [...acc.pages, { id: file.id, page: convertPage(page) }]
      }
      return res
    },
    { pages: [] }
  )
}

/**
 * downloadFiles - Triggers the download of one or multiple files by the browser
 *
 * @param {object} options
 * @param {import('cozy-client/types/CozyClient').default} options.client
 * @param {import('../../types').FileWithPage[]} options.filesWithPage - List of files to zip with their page
 * @param {Function} options.showAlert - Function to display an alert
 * @param {Function} options.t i18n function
 */
export const downloadFiles = async ({
  client,
  filesWithPage,
  showAlert,
  t
}) => {
  try {
    const fileCollection = client.collection(FILES_DOCTYPE)
    if (filesWithPage.length === 1) {
      const { file, page } = filesWithPage[0]
      if (filesWithPage[0].page === null) {
        const filename = file.name
        const downloadURL = await fileCollection.getDownloadLinkById(
          file.id,
          filename
        )

        return fileCollection.forceFileDownload(`${downloadURL}?Dl=1`, filename)
      } else {
        const filename = makeFilenameWithPage({ file, page, t })
        const bin = await getPdfPage({
          client,
          file,
          // pdf-lib start page count from 0
          pageIndex: convertPage(page) - 1
        })
        const blob = new Blob([bin], { type: 'application/pdf' })
        return downloadBlob(filename, blob)
      }
    }

    if (filesWithPage.length > 0) {
      const opts = makeCreateArchiveLinkByIdsOptions(filesWithPage)
      const href = await fileCollection.createArchiveLinkByIds(opts)
      const fullpath = `${client.getStackClient().uri}${href}`
      fileCollection.forceFileDownload(fullpath, 'files.zip')
    }
  } catch (error) {
    showAlert({
      message: t(downloadFileError(error)),
      severity: 'error',
      variant: 'filled'
    })
  }
}

const isAlreadyInTrash = err => {
  const reasons = err.reason !== undefined ? err.reason.errors : undefined
  if (reasons) {
    for (const reason of reasons) {
      if (reason.detail === 'File or directory is already in the trash') {
        return true
      }
    }
  }
  return false
}

/**
 * trashFiles - Moves a set of files to the cozy trash
 *
 * @param {object} options
 * @param {import('cozy-client/types/CozyClient').default} options.client
 * @param {import('cozy-client/types/types').IOCozyFile[]} options.files  One or more files to trash
 * @param {Function} options.showAlert - Function to display an alert
 * @param {Function} options.t i18n function
 */
export const trashFiles = async ({ client, files, showAlert, t }) => {
  try {
    for (const file of files) {
      await client.destroy(file)
    }

    showAlert({
      message: t('common.trashFile.success'),
      severity: 'success',
      variant: 'filled'
    })
  } catch (err) {
    if (!isAlreadyInTrash(err)) {
      showAlert({
        message: t('common.trashFile.error'),
        severity: 'error',
        variant: 'filled'
      })
    }
  }
}

/**
 * removeQualification - Remove qualification attribute
 *
 * @param {object} options
 * @param {import('cozy-client/types/CozyClient').default} options.client
 * @param {import('cozy-client/types/types').IOCozyFile[]} options.files  One or more files to remove qualification
 * @param {Function} options.showAlert - Function to display an alert
 * @param {Function} options.t i18n function
 */
export const removeQualification = async ({ client, files, showAlert, t }) => {
  try {
    const fileCollection = client.collection(FILES_DOCTYPE)
    for (const file of files) {
      await fileCollection.updateMetadataAttribute(file._id, {
        qualification: undefined
      })
    }

    showAlert({
      message: t('common.removeQualification.success'),
      severity: 'success',
      variant: 'filled'
    })
  } catch (err) {
    showAlert({
      message: t('common.removeQualification.error'),
      severity: 'error',
      variant: 'filled'
    })
  }
}

/**
 * Transform the list of files into a list of objects with file and page attributes (page is null)
 * @param {import('cozy-client/types/types').IOCozyFile[]} files - List of io.cozy.file
 * @returns {import('../../types').FileWithPage[]} - List of files with their page
 */
export const normalizeFilesWithPage = files => {
  return files.map(file => ({ file, page: null }))
}

/**
 * Pick the selected page to forward
 * @param {import('../../types').PagePickerOption[]} selectedChoice - Selected choice
 * @param {import('cozy-client/types/types').IOCozyFile} file - io.cozy.file object
 * @returns {string} - Search parameters
 */
export const onPickForwardedPage = (selectedChoice, file) => {
  const frontSide = selectedChoice.find(el => el.name === 'front')?.name
  const backSide = selectedChoice.find(el => el.name === 'back')?.name
  const doSplit = selectedChoice.find(el => el.name === 'split')?.name

  if (frontSide && backSide) {
    if (doSplit) {
      return `fileId=${file._id}&page=${frontSide}&fileId=${file._id}&page=${backSide}`
    } else {
      return `fileId=${file._id}&page=${null}`
    }
  }
  const page = frontSide ? frontSide : backSide ? backSide : null

  return `fileId=${file._id}&page=${page}`
}

/**
 * Pick the selected page
 * @param {import('../../types').PagePickerOption[]} selectedChoice - Selected choice
 * @param {import('cozy-client/types/types').IOCozyFile} file - io.cozy.file object
 * @returns {import('../../types').FileWithPage[]} - List of files with their page
 */
export const onPickSelectedPage = (selectedChoice, file) => {
  const frontSide = selectedChoice.find(el => el.name === 'front')?.name
  const backSide = selectedChoice.find(el => el.name === 'back')?.name
  const doSplit = selectedChoice.find(el => el.name === 'split')?.name

  if (frontSide && backSide) {
    if (doSplit) {
      return [
        { file, page: frontSide },
        { file, page: backSide }
      ]
    } else {
      return [{ file, page: null }]
    }
  }
  const page = frontSide ? frontSide : backSide ? backSide : null

  return [{ file, page }]
}
