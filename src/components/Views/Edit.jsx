import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import useReferencedContact from 'src/components/Hooks/useReferencedContact'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import { FILES_DOCTYPE } from 'src/constants'
import { buildFileQueryById } from 'src/queries'

import { useQuery, isQueryLoading, useClient } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

const EditPaperModal = ({ ioCozyFile, contacts, onClose, onSubmit }) => {
  const client = useClient()
  const { currentDefinition, allCurrentSteps, currentStepIndex } =
    useStepperDialog()
  const { setFormData } = useFormData()
  const [isInit, setIsInit] = useState(false)

  const multipage = allCurrentSteps[currentStepIndex].multipage

  // we want to set formData only once, so on the first mount
  // so no need for dependencies on useEffect
  useEffect(() => {
    const init = async () => {
      const binaryFile = await client
        .collection(FILES_DOCTYPE)
        .fetchFileContentById(ioCozyFile._id)

      const file = new File([binaryFile], ioCozyFile.name, {
        type: ioCozyFile.mime
      })
      file.isBlank = ioCozyFile.metadata?.paperProps?.isBlank

      setFormData({
        file: ioCozyFile,
        data: [
          {
            file,
            stepIndex: 0,
            fileMetadata: { multipage }
          }
        ],
        metadata: { [ioCozyFile._type]: ioCozyFile.metadata },
        contacts
      })

      setIsInit(true)
    }

    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentDefinition || !isInit) {
    return null
  }

  return <StepperDialogWrapper onClose={onClose} onSubmit={onSubmit} />
}

export const EditLoader = ({ onClose, onSubmit }) => {
  const { fileId } = useParams()

  const buildedFilesQuery = buildFileQueryById(fileId)
  const { data: files, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const { contacts, isLoadingContacts } = useReferencedContact(files || [])

  const ioCozyFile = files?.[0]

  if (isQueryLoading(filesQueryResult) || isLoadingContacts)
    return <Spinner className="u-m-0" size="xxlarge" middle color="white" />

  return (
    <StepperDialogProvider isEdit={true}>
      <FormDataProvider>
        <EditPaperModal
          ioCozyFile={ioCozyFile}
          contacts={contacts}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </FormDataProvider>
    </StepperDialogProvider>
  )
}

const EditWrapper = () => {
  const navigate = useNavigate()

  return (
    <EditLoader
      onClose={() => navigate('..')}
      onSubmit={() => navigate('..')}
    />
  )
}

export default EditWrapper
