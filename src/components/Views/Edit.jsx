import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FormDataProvider } from 'src/components/Contexts/FormDataProvider'
import { useFormData } from 'src/components/Contexts/FormDataProvider'
import { StepperDialogProvider } from 'src/components/Contexts/StepperDialogProvider'
import { useStepperDialog } from 'src/components/Contexts/StepperDialogProvider'
import useReferencedContact from 'src/components/Hooks/useReferencedContact'
import StepperDialogWrapper from 'src/components/StepperDialog/StepperDialogWrapper'
import { makeDataOfEditFormData } from 'src/components/Views/helpers'
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
      const data = await makeDataOfEditFormData({
        client,
        ioCozyFile,
        isMultipage: multipage
      })

      setFormData({
        file: ioCozyFile,
        data,
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

/**
 * Also used with the intent
 * @param {object} props
 * @param {Function} props.onClose
 * @param {Function} props.onSubmit
 * @param {Function} props.stepFilterFn
 */
export const EditLoader = ({ onClose, onSubmit, stepFilterFn }) => {
  const { fileId } = useParams()

  const buildedFilesQuery = buildFileQueryById(fileId)
  const { data: files, ...filesQueryResult } = useQuery(
    buildedFilesQuery.definition,
    buildedFilesQuery.options
  )
  const { contacts, isLoadingContacts } = useReferencedContact(files || [])

  if (isQueryLoading(filesQueryResult) || isLoadingContacts) {
    return <Spinner className="u-m-0" size="xxlarge" middle color="white" />
  }

  return (
    <StepperDialogProvider isEdit={true} stepFilterFn={stepFilterFn}>
      <FormDataProvider>
        <EditPaperModal
          ioCozyFile={files[0]}
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
  const [searchParams] = useSearchParams()
  const stepModel = searchParams.get('model')

  const stepFilterFn = step => {
    if (!stepModel) {
      return true
    }
    return step.model === stepModel
  }

  return (
    <EditLoader
      onClose={() => navigate('..')}
      onSubmit={() => navigate('..')}
      stepFilterFn={stepFilterFn}
    />
  )
}

export default EditWrapper
