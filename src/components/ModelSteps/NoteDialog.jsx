import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import StepperDialogTitle from 'src/components/StepperDialog/StepperDialogTitle'
import { FILES_DOCTYPE } from 'src/constants'
import { addContactReferenceToFile } from 'src/helpers/createPdfAndSave'
import { buildFileQueryById } from 'src/queries'

import { useClient } from 'cozy-client'
import { Qualification } from 'cozy-client/dist/models/document'
import { saveFileQualification, normalize } from 'cozy-client/dist/models/file'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import IntentIframe from 'cozy-ui/transpiled/react/IntentIframe'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

const NoteDialog = ({ onClose, onBack }) => {
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { currentStepIndex } = useStepperDialog()
  const { qualificationLabel } = useParams()
  const { formData } = useFormData()

  const handleTerminate = async ({ document }) => {
    const qualification = Qualification.getByLabel(qualificationLabel)
    const fileCollection = client.collection(FILES_DOCTYPE)

    const { data } = await client.fetchQueryAndGetFromState(
      buildFileQueryById(document.id)
    )
    const { data: fileCreated } = await saveFileQualification(
      client,
      data,
      qualification
    )
    const normalizedFile = normalize(fileCreated)

    await addContactReferenceToFile({
      fileCreated: normalizedFile,
      fileCollection,
      contacts: formData.contacts
    })

    onClose()
  }

  return (
    <Dialog
      open
      {...(currentStepIndex > 0 && { transitionDuration: 0 })}
      onClose={onClose}
      onBack={onBack}
      componentsProps={{
        dialogTitle: {
          className: 'u-flex u-flex-justify-between u-flex-items-center'
        }
      }}
      title={<StepperDialogTitle />}
      content={
        <IntentIframe
          action="OPEN"
          type="io.cozy.notes.documents"
          iframeProps={{
            wrapperProps: {
              style: { height: !isMobile && '50vh' }
            }
          }}
          create={client.intents.create}
          onCancel={onClose}
          onTerminate={handleTerminate}
        />
      }
    />
  )
}

export default NoteDialog
