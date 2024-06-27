import React, { useEffect, useCallback, useState } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import useReferencedContact from 'src/components/Hooks/useReferencedContact'
import {
  getFirstFileFromNative,
  makeFileFromBase64
} from 'src/components/ModelSteps/helpers'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import { FILES_DOCTYPE } from 'src/constants'
import { buildFileQueryById } from 'src/queries'

import { useQuery, isQueryLoading, useClient } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'
import minilog from 'cozy-minilog'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useIntent } from 'cozy-ui/transpiled/react/providers/Intent'

const log = minilog('CreatePaperModal')

const CreatePaperModal = ({ ioCozyFile, contacts }) => {
  const navigate = useNavigate()
  const client = useClient()
  const { qualificationLabel } = useParams()
  const [searchParams] = useSearchParams()
  const { currentDefinition, allCurrentSteps, currentStepIndex } =
    useStepperDialog()
  const webviewIntent = useWebviewIntent()
  const { setFormData } = useFormData()
  const { service } = useIntent()
  const [isInit, setIsInit] = useState(false)

  const fromFlagshipUpload = searchParams.get('fromFlagshipUpload')

  const multipage = allCurrentSteps[currentStepIndex].multipage

  console.info(' ')
  console.info('## CreatePaperModal')
  console.info('contacts :', contacts)
  console.info('currentDefinition :', currentDefinition)
  console.info('currentStepIndex :', currentStepIndex)
  console.info('allCurrentSteps :', allCurrentSteps)
  console.info(' ')

  // commentaire bleu
  useEffect(() => {
    const init = async () => {
      console.info(' ')
      console.info('## Intent CreatePaperModal useEffect')
      console.info(' ')
      const binaryFile = await client
        .collection(FILES_DOCTYPE)
        .fetchFileContentById(ioCozyFile._id)

      const file = new File([binaryFile], ioCozyFile.name, {
        type: ioCozyFile.mime
      })

      setFormData({
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

  return (
    <StepperDialogWrapper
      onClose={service.cancel}
      onSubmit={service.terminate}
    />
  )
}

const IntentLoader = () => {
  console.info('>> is in intent')
  const { data } = useIntent()

  console.info('fileId :', data.fileId)

  const buildedFilesQuery = buildFileQueryById(data.fileId)
  const { data: files, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const { contacts, isLoadingContacts } = useReferencedContact(files || [])

  const ioCozyFile = files?.[0]

  if (isQueryLoading(filesQueryResult) || isLoadingContacts)
    return <Spinner className="u-m-0" size="xxlarge" middle color="white" />

  return (
    <StepperDialogProvider>
      <FormDataProvider>
        <CreatePaperModal ioCozyFile={ioCozyFile} contacts={contacts} />
      </FormDataProvider>
    </StepperDialogProvider>
  )
}

export default IntentLoader
