import React from 'react'
import { computeMaxPapers } from 'src/components/PapersPaywall/helpers'

import { MaxPapersPaywall } from 'cozy-ui/transpiled/react/Paywall'

/**
 * @param {Object} props
 * @param {Function} props.onClose
 */
const PapersPaywall = ({ onClose }) => {
  const max = computeMaxPapers()
  return <MaxPapersPaywall max={max} onClose={onClose} />
}

export default PapersPaywall
