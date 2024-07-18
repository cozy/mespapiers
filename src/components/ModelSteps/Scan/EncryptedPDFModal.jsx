import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const EncryptedPDFModal = ({ onClose }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open
      title={t('EncryptedPDFModal.title')}
      content={t('EncryptedPDFModal.content')}
      actions={
        <Button
          variant="secondary"
          fullWidth
          label={t('EncryptedPDFModal.action')}
          onClick={onClose}
        />
      }
      onClose={onClose}
    />
  )
}

export default EncryptedPDFModal
