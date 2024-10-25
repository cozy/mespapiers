import React from 'react'
import { makeFileLinksURL } from 'src/helpers/makeFileLinksURL'

import { isNote } from 'cozy-client/dist/models/file'
import Icon from 'cozy-ui/transpiled/react/Icon'

export const renderImage = ({ client, file, hasPage, isMultipleFile }) => {
  if (isMultipleFile) {
    return <Icon icon="file-type-zip" size={64} />
  }
  if (hasPage) {
    return <Icon icon="file-type-pdf" size={64} />
  }
  if (isNote(file)) {
    return <Icon icon="file-type-note" size={64} />
  }

  const src = makeFileLinksURL({
    client,
    file,
    linkType: 'tiny'
  })

  return src ? (
    <img src={src} alt="" className="u-mah-3 u-maw-3" />
  ) : (
    <Icon icon="file-type-files" size={64} />
  )
}
