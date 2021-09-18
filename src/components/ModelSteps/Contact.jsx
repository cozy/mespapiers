import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CompositeHeader from 'src/components/CompositeHeader/CompositeHeader'
import ContactAdapter from 'src/components/ModelSteps/widgets/ContactAdapter'

const Contact = ({ currentStep }) => {
  const { t } = useI18n()
  const { illustration, text } = currentStep

  return (
    <CompositeHeader
      icon={illustration}
      iconSize={'small'}
      title={t(text)}
      text={<ContactAdapter />}
    />
  )
}

export default Contact
