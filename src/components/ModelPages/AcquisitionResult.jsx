import React from 'react'

import Card from 'cozy-ui/transpiled/react/Card'
import DialogActions from 'cozy-ui/transpiled/react/DialogActions'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Check from 'cozy-ui/transpiled/react/Icons/Check'
import FileTypePdfIcon from 'cozy-ui/transpiled/react/Icons/FileTypePdf'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { useStepperDialogContext } from 'src/components/Hooks/useStepperDialogContext'

const isPDF = file => file.type === 'application/pdf'

const AcquisitionResult = ({ file, setFile }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const { nextPage } = useStepperDialogContext()

  return (
    <>
      <div className={!isMobile ? 'u-mh-2' : ''}>
        <div className={'u-flex u-flex-column u-flex-items-center u-mv-3'}>
          <Avatar
            icon={Check}
            size="xlarge"
            style={{
              color: 'var(--paperBackgroundColor)',
              backgroundColor: 'var(--successColor)'
            }}
            className={'u-mb-1'}
          />
          <Typography variant={'h5'}>{t('Acquisition.success')}</Typography>
        </div>
        <Card className={'u-ta-center'}>
          <div className={'u-mb-1'}>
            {!isPDF(file) ? (
              <img
                src={URL.createObjectURL(file)}
                style={{ maxWidth: '100%' }}
              />
            ) : (
              <Icon icon={FileTypePdfIcon} size={80} />
            )}
          </div>
          <Button
            label={t('common.replace')}
            theme={'text'}
            onClick={() => setFile(null)}
          />
        </Card>
      </div>
      <DialogActions disableSpacing className={'columnLayout'}>
        <Button
          className="u-db"
          extension="full"
          label={t('common.next')}
          onClick={nextPage}
        />
      </DialogActions>
    </>
  )
}

export default AcquisitionResult
