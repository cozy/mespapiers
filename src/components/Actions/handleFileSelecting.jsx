import React from 'react'
import {
  normalizeFilesWithPage,
  onPickSelectedPage
} from 'src/components/Actions/utils'
import { PagePickerModal } from 'src/components/PagePickerModal/PagePickerModal'
import { is2SidedFile } from 'src/helpers/is2SidedFile'

/**
 * Check if the file has 2 sides, and if so, open a modal to choose which side to select
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {{file: import('cozy-client/types/types').IOCozyFile, page: string|null}[]} params.filesWithPage - List of files with their page to select
 * @param {Function} params.pushModal - Function to push a modal
 * @param {Function} params.popModal - Function to pop a modal
 * @param {Function} params.t - Translation function
 */
export const handleFileSelecting = async ({
  client,
  filesWithPage,
  addMultiSelectionItems,
  pushModal,
  popModal,
  t
}) => {
  for (const fileWithPage of filesWithPage) {
    const { file } = fileWithPage
    const isFileWith2side = await is2SidedFile(client, file)
    if (isFileWith2side) {
      pushModal(
        <PagePickerModal
          file={file}
          textAction={t('common.ok')}
          onClick={selectedChoice => {
            const selected = onPickSelectedPage(selectedChoice, file)
            addMultiSelectionItems(selected)
          }}
          onClose={popModal}
        />
      )
    } else {
      addMultiSelectionItems(normalizeFilesWithPage([file]))
    }
  }
}
