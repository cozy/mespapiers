import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import ScanResultCardImage from 'src/components/ModelSteps/ScanResult/ScanResultCardImage'
import ScanResultCardPDF from 'src/components/ModelSteps/ScanResult/ScanResultCardPDF'
import {
  getLastFormDataFile,
  isSameFile
} from 'src/components/ModelSteps/helpers'

const ScanResultCard = forwardRef((props, ref) => {
  const { currentFile, setCurrentFile } = props
  const { setFormData, formData } = useFormData()
  const { currentStepIndex } = useStepperDialog()

  const handleSelectedFile = () => {
    const newData = formData.data.filter(
      data => !isSameFile(currentFile, data.file)
    )
    setCurrentFile(
      getLastFormDataFile({ formData: { data: newData }, currentStepIndex })
    )

    setFormData(prev => ({
      ...prev,
      data: newData
    }))
  }

  if (currentFile.type === 'application/pdf') {
    return (
      <ScanResultCardPDF {...props} handleSelectedFile={handleSelectedFile} />
    )
  }

  return (
    <ScanResultCardImage
      {...props}
      handleSelectedFile={handleSelectedFile}
      ref={ref}
    />
  )
})

ScanResultCard.displayName = 'ScanResultCard'

ScanResultCard.propTypes = {
  currentFile: PropTypes.object.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
  setRotationImage: PropTypes.func.isRequired,
  rotationImage: PropTypes.number.isRequired
}

export default ScanResultCard
