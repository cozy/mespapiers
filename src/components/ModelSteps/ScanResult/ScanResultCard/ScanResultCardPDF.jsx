import PropTypes from 'prop-types'
import React from 'react'
import styles from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCard.styl'
import ScanResultCardPDFActions from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCardPDFActions'
import { PdfOverview } from 'src/components/PdfOverview/PdfOverview'

import Box from 'cozy-ui/transpiled/react/Box'
import Card from 'cozy-ui/transpiled/react/Card'
import Typography from 'cozy-ui/transpiled/react/Typography'

const ScanResultCardPDF = props => {
  const { currentFile, handleSelectedFile } = props
  // Replace all "_" with a space in the filename for better readability
  const fileName = currentFile.name.replaceAll('_', ' ')

  return (
    <Card className="u-ta-center u-p-1 u-flex u-flex-column u-flex-justify-between">
      <div className={styles['image-container']}>
        <PdfOverview file={currentFile} />
        <Typography className="u-mt-half">{fileName}</Typography>
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
