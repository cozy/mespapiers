import React from 'react'
import PropTypes from 'prop-types'

import { saveFileWithCordova } from 'cozy-client/dist/models/fsnative'
import { useClient } from 'cozy-client'
import { isIOS } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import ReplyIcon from 'cozy-ui/transpiled/react/Icons/Reply'
import ShareIosIcon from 'cozy-ui/transpiled/react/Icons/ShareIos'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

const isMissingFileError = error => error.status === 404

const downloadFileError = error => {
  return isMissingFileError(error)
    ? 'error.download_file.missing'
    : 'error.download_file.offline'
}
/**
 * exportFilesNative - Triggers a prompt to download a file on mobile devices
 *
 * @param {CozyClient} client
 * @param {array} files    One or more files to download
 * @param {string} filename The name of the file that will be saved
 */
export const exportFilesNative = async (client, files, filename) => {
  const downloadAllFiles = files.map(async file => {
    const response = await client
      .collection('io.cozy.files')
      .fetchFileContentById(file.id)

    const blob = await response.blob()
    const filenameToUse = filename ? filename : file.name
    const localFile = await saveFileWithCordova(blob, filenameToUse)
    return localFile.nativeURL
  })

  try {
    Alerter.info('alert.preparing', {
      duration: Math.min(downloadAllFiles.length * 2000, 6000)
    })
    // TODO use a promise pool here
    const urls = await Promise.all(downloadAllFiles)
    if (urls.length === 1 && isIOS()) {
      // TODO
      // It seems that files: is not well supported on iOS. url seems to work well
      // at with one file. Need to check when severals
      window.plugins.socialsharing.shareWithOptions(
        {
          url: urls[0]
        },
        result => {
          if (result.completed === true) {
            Alerter.success('mobile.download.success')
          }
        },
        error => {
          throw error
        }
      )
    } else {
      window.plugins.socialsharing.shareWithOptions(
        {
          files: urls
        },
        null,
        error => {
          throw error
        }
      )
    }
  } catch (error) {
    Alerter.error(downloadFileError(error))
  }
}

const ForwardIcon = isIOS() ? ShareIosIcon : ReplyIcon

const ForwardButton = ({ file }) => {
  const { t } = useI18n()
  const client = useClient()

  const onFileOpen = async file => {
    try {
      await exportFilesNative(client, [file])
    } catch (error) {
      Alerter.info(`mobile.error.open_with.${error}`, { fileMime: file.mime })
    }
  }

  return (
    <Button
      extension="full"
      theme="secondary"
      icon={ForwardIcon}
      label={t('Viewer.actions.forward')}
      onClick={() => onFileOpen(file)}
    />
  )
}

ForwardButton.propTypes = {
  file: PropTypes.object.isRequired
}

export default ForwardButton
