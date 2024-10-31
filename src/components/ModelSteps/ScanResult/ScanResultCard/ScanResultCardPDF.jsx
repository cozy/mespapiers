import PropTypes from 'prop-types'
import React from 'react'
import styles from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCard.styl'
import ScanResultCardPDFActions from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCardPDFActions'

import Box from 'cozy-ui/transpiled/react/Box'
import Card from 'cozy-ui/transpiled/react/Card'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'

const ScanResultCardPDF = props => {
  const { currentFile, handleSelectedFile } = props

  return (
    <Card className="u-ta-center u-p-1 u-flex u-flex-column u-flex-justify-between">
      <div className={styles['image-container']}>
        <Icon icon="file-type-pdf" size={80} aria-hidden="true" />
        <Typography className="u-mt-half">{currentFile.name}</Typography>
      </div>
      <Box display="flex" gridGap="1rem" marginTop="1rem">
        <ScanResultCardPDFActions onCancel={handleSelectedFile} />
      </Box>
    </Card>
  )
}

ScanResultCardPDF.propTypes = {
  currentFile: PropTypes.object.isRequired,
  handleSelectedFile: PropTypes.func.isRequired
}

export default ScanResultCardPDF
