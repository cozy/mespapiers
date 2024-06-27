import PropTypes from 'prop-types'
import React from 'react'
import { makeFileLinksURL } from 'src/helpers/makeFileLinksURL'

import { useClient } from 'cozy-client'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const PagePickerModalContentHeader = ({ file }) => {
  const client = useClient()
  const src = makeFileLinksURL({ client, file, linkType: 'tiny' })

  return (
    <div className="u-ta-center u-mb-1">
      {src ? (
        <img src={src} alt="" className="u-mah-3 u-maw-3" />
      ) : (
        <Icon icon="file-type-pdf" size={64} />
      )}
      <Typography variant="h5" className="u-mv-1">
        {file.name}
      </Typography>
    </div>
  )
}

PagePickerModalContentHeader.propTypes = {
  file: PropTypes.object.isRequired
}
