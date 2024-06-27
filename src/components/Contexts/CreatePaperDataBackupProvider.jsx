import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL,
  getAndRemoveIndexedStorageData
} from 'src/helpers/indexedStorage'

/**
 * useful when creating a paper on the AA and the phone closes the app just long enough to take a photo
 */
export const CreatePaperDataBackupProvider = ({ children }) => {
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

  return children
}
