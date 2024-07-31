import React from 'react'
import { downloadFiles, onPickSelectedPage } from 'src/components/Actions/utils'
import { PagePickerModal } from 'src/components/PagePickerModal/PagePickerModal'
import { is2SidedFile } from 'src/helpers/is2SidedFile'

/**
 * Check if the file has 2 sides, and if so, open a modal to choose which side to download
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {import('../../types').FileWithPage[]} params.filesWithPage - List of files with their page to forward
 * @param {Function} params.pushModal - Function to push a modal
 * @param {Function} params.popModal - Function to pop a modal
 * @param {Function} params.showAlert - Function to show an alert
 * @param {Function} params.t - Translation function
 * @param {boolean} [params.fromMultiSelection] - Whether the action is from a multi-selection
 * @param {WebviewService | undefined} [params.webviewIntent] - WebviewIntent used to call methods on FlagshipApp (when hosted in a WebView)
 */
export const handleFileDownloading = async ({
  client,
  filesWithPage,
  showAlert,
  pushModal,
  popModal,
  t,
  fromMultiSelection,
  webviewIntent
}) => {
  if (
    filesWithPage.length === 1 &&
    filesWithPage[0].page === null &&
    !fromMultiSelection
  ) {
    const file = filesWithPage[0].file
    const isFileWith2side = await is2SidedFile(client, file)
    if (isFileWith2side) {
      pushModal(
        <PagePickerModal
          file={file}
          textAction={t('action.download')}
          onClick={selectedChoice => {
            const selected = onPickSelectedPage(selectedChoice, file)
            downloadFiles({
              client,
              t,
              filesWithPage: selected,
              showAlert,
              webviewIntent
            })
          }}
          onClose={popModal}
        />
      )
    } else {
      downloadFiles({ client, t, filesWithPage, showAlert, webviewIntent })
    }
    return
  }

  if (filesWithPage.length > 0) {
    downloadFiles({ client, t, filesWithPage, showAlert, webviewIntent })
  }
}
