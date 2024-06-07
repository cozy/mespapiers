import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useCurrentEditInformations } from 'src/components/Hooks/useCurrentEditInformations'
import PageEditDesktop from 'src/components/ModelSteps/Edit/PageEdit/PageEditDesktop'
import PageEditItems from 'src/components/ModelSteps/Edit/PageEdit/PageEditItems'
import PageEditMobile from 'src/components/ModelSteps/Edit/PageEdit/PageEditMobile'
import { FILES_DOCTYPE } from 'src/constants'

import { useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

const pageItems = ['front', 'back']

const PageEdit = () => {
  const { fileId } = useParams()
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()

  const [isBusy, setIsBusy] = useState(false)
  const [value, setValue] = useState('')

  const currentEditInformation = useCurrentEditInformations(fileId, 'page')
  const currentPage = currentEditInformation?.file?.metadata?.page

  useEffect(() => {
    if (!value && currentPage) {
      setValue(currentPage)
    }
  }, [value, currentPage])

  const onClose = () => {
    navigate('..')
  }

  const onConfirm = async newValue => {
    setIsBusy(true)
    let newMetadata = {
      ...currentEditInformation.file.metadata,
      page: newValue ?? value
    }

    await client
      .collection(FILES_DOCTYPE)
      .updateMetadataAttribute(fileId, newMetadata)

    onClose()
  }

  const handleChange = newValue => {
    if (value !== newValue) {
      setValue(newValue)
      if (isMobile) onConfirm(newValue)
    }
  }

  if (!currentEditInformation.isLoading && !currentEditInformation.file) {
    return <Navigate to=".." />
  }

  return isMobile ? (
    <PageEditMobile onClose={onClose}>
      <PageEditItems items={pageItems} onChange={handleChange} value={value} />
    </PageEditMobile>
  ) : (
    <PageEditDesktop onClose={onClose} onConfirm={onConfirm} isBusy={isBusy}>
      <PageEditItems items={pageItems} onChange={handleChange} value={value} />
    </PageEditDesktop>
  )
}

export default PageEdit
