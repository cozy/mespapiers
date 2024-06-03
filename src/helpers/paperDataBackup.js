import {
  CREATE_PAPER_DATA_BACKUP_CURRENT_STEP_INDEX,
  CREATE_PAPER_DATA_BACKUP_FORM_DATA,
  CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL,
  removeIndexedStorageData,
  storeIndexedStorageData
} from 'src/helpers/indexedStorage'

export const storeCreatePaperDataBackup = async ({
  qualificationLabel,
  currentStepIndex,
  exportedFormData
}) => {
  await storeIndexedStorageData(
    CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL,
    qualificationLabel
  )
  await storeIndexedStorageData(
    CREATE_PAPER_DATA_BACKUP_CURRENT_STEP_INDEX,
    currentStepIndex
  )
  await storeIndexedStorageData(
    CREATE_PAPER_DATA_BACKUP_FORM_DATA,
    exportedFormData
  )
}

export const removeCreatePaperDataBackup = async () => {
  await removeIndexedStorageData(CREATE_PAPER_DATA_BACKUP_QUALIFICATION_LABEL)
  await removeIndexedStorageData(CREATE_PAPER_DATA_BACKUP_CURRENT_STEP_INDEX)
  await removeIndexedStorageData(CREATE_PAPER_DATA_BACKUP_FORM_DATA)
}
