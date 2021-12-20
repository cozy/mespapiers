import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'

const FilePickerFooter = ({ onClose }) => {
  return <Button label={'Annuler'} theme="secondary" onClick={onClose} />
}

FilePickerFooter.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default FilePickerFooter
