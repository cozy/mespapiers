import PropTypes from 'prop-types'
import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ScanResultCardPDFActions = ({ onCancel }) => {
  const { t } = useI18n()

  return (
    <Button
      data-testid="retry-button"
      label={t('Acquisition.pdf.edit')}
      fullWidth
      variant="secondary"
      onClick={onCancel}
    />
  )
}

ScanResultCardPDFActions.propTypes = {
  onCancel: PropTypes.func
}

export default ScanResultCardPDFActions
