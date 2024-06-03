import PropTypes from 'prop-types'
import React from 'react'
import KonnectorEnergy from 'src/assets/icons/Energy.svg'
import Konnectors from 'src/assets/icons/Konnectors.svg'
import KonnectorPayslip from 'src/assets/icons/Payslip.svg'
import KonnectorTelecom from 'src/assets/icons/Telecom.svg'

import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'

export const KonnectorIcon = ({ konnectorCriteria, ...props }) => {
  if (konnectorCriteria.name) {
    return (
      <AppIcon
        app={{ slug: konnectorCriteria.name }}
        priority="registry"
        type="konnector"
        {...props}
      />
    )
  }

  const categoryOrQualificationLabel =
    konnectorCriteria.category || konnectorCriteria.qualificationLabel

  switch (categoryOrQualificationLabel) {
    case 'telecom':
    case 'isp':
      return <Icon icon={KonnectorTelecom} {...props} />

    case 'energy':
      return <Icon icon={KonnectorEnergy} {...props} />

    case 'pay_sheet':
      return <Icon icon={KonnectorPayslip} {...props} />

    default:
      return <Icon icon={Konnectors} {...props} />
  }
}

KonnectorIcon.prototype = {
  konnectorCriteria: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    qualificationLabel: PropTypes.string
  }).isRequired
}
