/* global cozy */
import React, { useState } from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Typography from 'cozy-ui/transpiled/react/Typography'

const url = 'https://support.grandlyon.com/mes-papiers/'

const Help = () => {
  const [showDialog, setShowDialog] = useState(false)
  const { t } = useI18n()
  const { BarRight } = cozy.bar

  return (
    <>
      <BarRight>
        <IconButton onClick={() => setShowDialog(true)}>
          <Icon icon="help" />
        </IconButton>
      </BarRight>
      {showDialog && (
        <ConfirmDialog
          open
          title={t('help.title')}
          content={
            <>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: t('help.content.paragraph01')
                }}
              />
              <Typography className="u-mt-1">
                {t('help.content.paragraph02')}
              </Typography>
              <Typography
                className="u-mt-1"
                dangerouslySetInnerHTML={{
                  __html: t('help.content.paragraph03', { url })
                }}
              />
              <Typography className="u-mt-1">
                {t('help.content.paragraph04')}
              </Typography>
            </>
          }
          actions={
            <>
              <Button
                fullWidth
                variant="secondary"
                label={t('help.actions.later')}
                onClick={() => setShowDialog(false)}
              />
              <Button
                component="a"
                href={url}
                target="_blank"
                rel="noopener"
                fullWidth
                label={t('help.actions.go')}
                endIcon={<Icon icon="link-out" />}
              />
            </>
          }
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  )
}

export default Help
