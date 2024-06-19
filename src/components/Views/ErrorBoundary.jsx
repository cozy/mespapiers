import React, { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'
import MesPapiersBroken from 'src/assets/icons/MesPapiersBroken.svg'
import { useError } from 'src/components/Contexts/ErrorProvider'
import styles from 'src/components/Views/styles.styl'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Empty from 'cozy-ui/transpiled/react/Empty'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ErrorBoundary = () => {
  const routeError = useRouteError()
  const { t } = useI18n()
  const { setError } = useError()

  useEffect(() => {
    setError(routeError)
  }, [routeError, setError])

  return (
    <Empty
      className={styles['errorBoundaryEmpty']}
      icon={MesPapiersBroken}
      iconSize="large"
      title={t('ErrorBoundary.title')}
      text={t('ErrorBoundary.text')}
    >
      <Button
        className="u-mt-1"
        label={t('ErrorBoundary.action')}
        onClick={() => window.location.reload()}
      />
    </Empty>
  )
}

export default ErrorBoundary
