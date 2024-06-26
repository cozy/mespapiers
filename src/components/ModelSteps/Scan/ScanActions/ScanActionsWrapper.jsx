import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import ScanDesktopActions from 'src/components/ModelSteps/Scan/ScanActions/ScanDesktopActions'
import ScanFlagshipActions from 'src/components/ModelSteps/Scan/ScanActions/ScanFlagshipActions'
import ScanMobileActions from 'src/components/ModelSteps/Scan/ScanActions/ScanMobileActions'

import { isFlagshipApp, isMobile } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { useWebviewIntent } from 'cozy-intent'

const ScanActionsWrapper = props => {
  const [isFlagshipScanAvailable, setIsFlagshipScanAvailable] = useState(false)
  const webviewIntent = useWebviewIntent()

  useEffect(() => {
    const checkScanDocument = async () => {
      const isAvailable = await webviewIntent.call('isScannerAvailable')
      setIsFlagshipScanAvailable(isAvailable)
    }
    flag('mespapiers.features.v3') && webviewIntent && checkScanDocument()
  }, [webviewIntent])

  if (
    flag('mespapiers.features.v3') &&
    isFlagshipApp() &&
    isFlagshipScanAvailable
  ) {
    return <ScanFlagshipActions {...props} />
  }

  if (isMobile()) {
    return <ScanMobileActions {...props} />
  }

  return <ScanDesktopActions {...props} />
}

ScanActionsWrapper.propTypes = {
  onChangeFile: PropTypes.func,
  onOpenFilePickerModal: PropTypes.func,
  onOpenFlagshipScan: PropTypes.func
}

export default ScanActionsWrapper
