import React from 'react'
import { onPickForwardedPage } from 'src/components/Actions/utils'
import { PagePickerModal } from 'src/components/PagePickerModal/PagePickerModal'
import { is2SidedFile } from 'src/helpers/is2SidedFile'

/**
 * Check if the file has 2 sides, and if so, open a modal to choose which side to forward
 * @param {object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient instance
 * @param {{file: import('cozy-client/types/types').IOCozyFile, page: string|null}[]} params.filesWithPage - List of files with their page to forward
 * @param {Function} params.pushModal - Function to push a modal
 * @param {Function} params.popModal - Function to pop a modal
 * @param {Function} params.navigate - Function to navigate
 * @param {Function} params.t - Translation function
 * @param {boolean} [params.fromMultiSelection] - Whether the action is from a multi-selection
 */
export const handleFileForwarding = async ({
  client,
  filesWithPage,
  pushModal,
  popModal,
  navigate,
  t,
  fromMultiSelection
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
          textAction={t('common.next')}
          onClick={selectedChoice => {
            const searchParams = onPickForwardedPage(selectedChoice, file)
            navigate({
              pathname: 'forward',
              search: `?${searchParams}`
            })
          }}
          onClose={popModal}
        />
      )
    } else {
      navigate({
        pathname: 'forward',
        search: `?fileId=${file._id}`
      })
    }
    return
  }

  if (filesWithPage.length > 0) {
    const searchParams = filesWithPage
      .map(({ file, page }) => {
        return `fileId=${file._id}&page=${page}`
      })
      .join('&')

    navigate({
      pathname: 'forward',
      search: `?${searchParams}`
    })
  }
}
