import PropTypes from 'prop-types'
import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const PreviewConfirm = ({ onClose, onClick }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      title={t('PreviewConfirm.title')}
      content={
        <Typography
          dangerouslySetInnerHTML={{
            __html: t('PreviewConfirm.text')
          }}
        />
      }
      actions={
        <>
          <Button
            theme="secondary"
            onClick={onClose}
            label={t('PreviewConfirm.actions.cancel')}
          />
          <Button label={t('PreviewConfirm.actions.ok')} onClick={onClick} />
        </>
      }
    />
  )
}

PreviewConfirm.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func
}
