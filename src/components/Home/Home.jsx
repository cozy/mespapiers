import React from 'react'

import { useI18n } from 'cozy-ui/react/I18n'

const Home = () => {
  const { t } = useI18n()

  return <p>{t('Home.welcome')}</p>
}

export default Home
