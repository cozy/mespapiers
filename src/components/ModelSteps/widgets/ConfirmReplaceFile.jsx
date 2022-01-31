import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

const ConfirmReplaceFile = ({ onReplace, onClose, cozyFilesCount }) => {
  const { t } = useI18n()

  const onClickReplace = useCallback(
    isReplaced => () => {
      onReplace(isReplaced)
      onClose()
    },
    [onClose, onReplace]
  )

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      title={t('ConfirmReplaceFile.title', {
        smart_count: cozyFilesCount
      })}
      content={
        <Typography variant={'body1'}>
          {t('ConfirmReplaceFile.content', {
            smart_count: cozyFilesCount
          })}
        </Typography>
      }
      actions={
        <>
          <Button
            theme="secondary"
            onClick={onClickReplace(false)}
            label={t('ConfirmReplaceFile.no')}
          />
          <Button
            theme="danger"
            onClick={onClickReplace(true)}
            label={t('ConfirmReplaceFile.yes')}
          />
        </>
      }
    />
  )
}

ConfirmReplaceFile.propTypes = {
  onReplace: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  nbOfCozyFiles: PropTypes.number.isRequired
}

export default memo(ConfirmReplaceFile)
