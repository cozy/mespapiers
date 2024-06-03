import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL,
  getAndRemoveIndexedStorageData
} from 'src/helpers/indexedStorage'

const CreatePaperDataBackupRoute = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const restoreCreatePaperDataBackupIfNeeded = async () => {
      const qualificationLabel = await getAndRemoveIndexedStorageData(
        CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL
      )

      if (qualificationLabel) {
        navigate(`/paper/create/${qualificationLabel}`)
      }
    }

    restoreCreatePaperDataBackupIfNeeded()
  }, [navigate])

  return <Outlet />
}

export default CreatePaperDataBackupRoute
