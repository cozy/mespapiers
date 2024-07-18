import { PDFDocument } from 'pdf-lib'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { PaperDefinitionsStepPropTypes } from 'src/PaperDefinitionsPropTypes'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useModal } from 'src/components/Contexts/ModalProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import EncryptedPDFModal from 'src/components/ModelSteps/Scan/EncryptedPDFModal'
import ScanDialog from 'src/components/ModelSteps/Scan/ScanDialog'
import ScanResultDialog from 'src/components/ModelSteps/ScanResult/ScanResultDialog'
import {
  getLastFormDataFile,
  isFileAlreadySelected,
  makeFileFromBase64
} from 'src/components/ModelSteps/helpers'
import { FLAGSHIP_SCAN_TEMP_FILENAME } from 'src/constants'
import { makeFileFromBlob } from 'src/helpers/makeFileFromBlob'
import {
  removeCreatePaperDataBackup,
  storeCreatePaperDataBackup
} from 'src/helpers/paperDataBackup'

import { useClient } from 'cozy-client'
import { fetchBlobFileById } from 'cozy-client/dist/models/file'
import { useWebviewIntent } from 'cozy-intent'
import minilog from 'cozy-minilog'
import FilePicker from 'cozy-ui/transpiled/react/FilePicker'

const log = minilog('ScanWrapper')

const isFileEncryptedPDF = async file => {
  if (!file.type || file.type !== 'application/pdf') return false

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
  return pdf.isEncrypted
}

const ScanWrapper = ({ currentStep, onClose, onBack }) => {
  const client = useClient()
  const [searchParams] = useSearchParams()
  const { qualificationLabel } = useParams()
  const { currentStepIndex } = useStepperDialog()
  const { formData, setFormData, exportFormData } = useFormData()
  const { multipage, page } = currentStep
  const [currentFile, setCurrentFile] = useState(null)
  const [isFilePickerModalOpen, setIsFilePickerModalOpen] = useState(false)
  const webviewIntent = useWebviewIntent()
  const { pushModal, popModal } = useModal()

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')
  useEffect(() => {
    const file = getLastFormDataFile({ formData, currentStepIndex })
    if (file) {
      setCurrentFile(file)
    }
  }, [formData, currentStepIndex])

  const onChangeFile = async (file, { replace = false } = {}) => {
    // TODO : Integrate the values recovered by the OCR
    if (file) {
      if (await isFileEncryptedPDF(file)) {
        return pushModal(<EncryptedPDFModal onClose={popModal} />)
      }
      if (replace) {
        setFormData(prev => ({
          ...prev,
          data: prev.data.map(data => {
            if (
              data.stepIndex === currentStepIndex &&
              data.file.name === file.name
            ) {
              return { ...data, file }
            }
            return data
          })
        }))
      } else if (!isFileAlreadySelected(formData, currentStepIndex, file)) {
        setCurrentFile(file)
        setFormData(prev => ({
          ...prev,
          data: [
            ...prev.data,
            {
              file,
              stepIndex: currentStepIndex,
              fileMetadata: {
                page: !multipage ? page : '',
                multipage
              }
            }
          ]
        }))
      }
    }
  }

  const onChangeFilePicker = async cozyFileId => {
    const blobFile = await fetchBlobFileById(client, cozyFileId)
    const file = makeFileFromBlob(blobFile, {
      name: cozyFileId,
      from: 'cozy'
    })
    await onChangeFile(file)
  }

  const onOpenFlagshipScan = async () => {
    try {
      // We backup the current form state in case the operating system kills
      // the webview during the 'scanDocument' webview intent
      const exportedFormData = await exportFormData()

      await storeCreatePaperDataBackup({
        qualificationLabel,
        currentStepIndex,
        exportedFormData
      })

      const base64 = await webviewIntent.call('scanDocument')

      // If there was no issues during the 'scanDocument' webview intent,
      // we do not need to keep the current form state so we clean everything immediately
      await removeCreatePaperDataBackup()

      // TODO : Launch ocr after scanning the document
      const file = makeFileFromBase64({
        source: base64,
        name: FLAGSHIP_SCAN_TEMP_FILENAME,
        type: 'image/png'
      })
      await onChangeFile(file)
    } catch (error) {
      log.error('Flagship scan error', error)
    }
  }

  if (!!fromFlagshipUpload && !currentFile && currentStepIndex === 0) {
    return null
  }

  if (currentFile) {
    return (
      <ScanResultDialog
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        currentStep={currentStep}
        onChangeFile={onChangeFile}
        onClose={onClose}
        onBack={onBack}
      />
    )
  }

  return (
    <>
      <ScanDialog
        currentStep={currentStep}
        onChangeFile={onChangeFile}
        onOpenFilePickerModal={() => setIsFilePickerModalOpen(true)}
        onOpenFlagshipScan={onOpenFlagshipScan}
        onClose={onClose}
        onBack={onBack}
      />

      {isFilePickerModalOpen && (
        <FilePicker
          onChange={onChangeFilePicker}
          accept="image/jpg,image/jpeg,image/png,application/pdf"
          onClose={() => setIsFilePickerModalOpen(false)}
        />
      )}
    </>
  )
}

ScanWrapper.propTypes = {
  currentStep: PaperDefinitionsStepPropTypes
}

export default ScanWrapper
