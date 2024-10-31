import PropTypes from 'prop-types'
import React, { useState, forwardRef } from 'react'
import styles from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCard.styl'
import ScanResultCardActions from 'src/components/ModelSteps/ScanResult/ScanResultCard/ScanResultCardActions'
import RotateImage from 'src/components/ModelSteps/widgets/RotateImage'

import Box from 'cozy-ui/transpiled/react/Box'
import Card from 'cozy-ui/transpiled/react/Card'

const ScanResultCardImage = forwardRef((props, ref) => {
  const { currentFile, handleSelectedFile, setRotationImage, rotationImage } =
    props
  const [imgWrapperMinHeight, setImgWrapperMinHeight] = useState(0)
  const [isImageRotating, setIsImageRotating] = useState(false)

  const handleRotate = () => {
    setIsImageRotating(true)
    setRotationImage(prev => prev - 90)
  }

  const handleImageLoaded = () => {
    setIsImageRotating(false)
    // We don't want to recalculate the size on every rotation
    if (ref.current && imgWrapperMinHeight === 0) {
      const maxSize = Math.max(
        ref.current.offsetWidth,
        ref.current.offsetHeight
      )
      setImgWrapperMinHeight(maxSize)
    }
  }

  return (
    <Card className="u-ta-center u-p-1 u-flex u-flex-column u-flex-justify-between">
      <div className={styles['image-container']}>
        <RotateImage
          image={URL.createObjectURL(currentFile)}
          onLoaded={handleImageLoaded}
          rotation={rotationImage}
          a11n={{ 'aria-hidden': true }}
          ref={ref}
        />
      </div>
      <Box display="flex" gridGap="1rem" marginTop="1rem">
        <ScanResultCardActions
          onRotate={handleRotate}
          onCancel={handleSelectedFile}
          isImageRotating={isImageRotating}
        />
      </Box>
    </Card>
  )
})
ScanResultCardImage.displayName = 'ScanResultCardImage'

ScanResultCardImage.propTypes = {
  currentFile: PropTypes.object.isRequired,
  handleSelectedFile: PropTypes.func.isRequired,
  setRotationImage: PropTypes.func.isRequired,
  rotationImage: PropTypes.number.isRequired
}

export default ScanResultCardImage
