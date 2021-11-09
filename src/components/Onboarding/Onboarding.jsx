import React from 'react'
import { useHistory } from 'react-router-dom'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Button from 'cozy-ui/transpiled/react/Button'
import Empty from 'cozy-ui/transpiled/react/Empty'
import HomeCloud from 'src/assets/icons/HomeCloud.svg'

const Onboarding = () => {
  const history = useHistory()
  const { t } = useI18n()

  const onClick = () => {
    history.push({
      pathname: `/`
    })
  }

  return (
    <div
      className={
        'u-pos-fixed u-top-0 u-left-0 u-bottom-0 u-right-0 u-m-1 u-flex u-flex-column'
      }
    >
      <Empty
        icon={HomeCloud}
        iconSize={'large'}
        title={t('Home.Empty.title')}
        text={t('Home.Empty.text')}
        layout={false}
        className={'u-ph-1 u-flex-grow-1'}
      />
      <Button
        theme="primary"
        onClick={onClick}
        label={t('Onboarding.cta')}
        className={'u-flex-grow-0'}
      />
    </div>
  )
}

export default Onboarding
