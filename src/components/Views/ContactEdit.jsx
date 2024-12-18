import React, { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useCurrentEditInformations } from 'src/components/Hooks/useCurrentEditInformations'
import useReferencedContact from 'src/components/Hooks/useReferencedContact'
import ContactEditDialog from 'src/components/ModelSteps/Edit/ContactEditDialog'
import { updateReferencedContact } from 'src/components/ModelSteps/Edit/helpers'

import { useClient } from 'cozy-client'
import Backdrop from 'cozy-ui/transpiled/react/Backdrop'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'

const useStyles = makeStyles({
  backdropRoot: {
    zIndex: 'var(--zIndex-modal)'
  }
})

const ContactEdit = ({ onClose }) => {
  const { fileId } = useParams()
  const navigate = useNavigate()
  const client = useClient()
  const classes = useStyles()
  const { t } = useI18n()
  const { showAlert } = useAlert()

  const currentEditInformation = useCurrentEditInformations(fileId, 'contact')
  const { isLoadingContacts, contacts } = useReferencedContact([
    currentEditInformation.file
  ])
  const [isBusy, setIsBusy] = useState(false)

  const _onClose = () => {
    if (onClose) {
      onClose()
    } else {
      navigate('..')
    }
  }

  const onConfirm = async contactSelected => {
    setIsBusy(true)
    const contactIdsSelected = contactSelected.map(contact => contact._id)

    // Rename only if one referenced contact exist and one contact is selected
    if (contacts.length === 1 && contactSelected.length === 1) {
      const oldContactNameSelected = contacts[0].displayName
      const hasOldContactNameInFilename =
        currentEditInformation.file.name.includes(oldContactNameSelected)
      const hasDifferentContactSelected = contactSelected.every(
        contact => contact.displayName !== oldContactNameSelected
      )

      // Update filename if the old contact name is in the filename and the new contact selected is different
      if (hasOldContactNameInFilename && hasDifferentContactSelected) {
        const newContactNameSelected = contactSelected[0].displayName
        currentEditInformation.file = {
          ...currentEditInformation.file,
          name: currentEditInformation.file.name.replace(
            oldContactNameSelected,
            newContactNameSelected
          )
        }
      }
    }
    await updateReferencedContact({
      client,
      currentFile: currentEditInformation.file,
      contactIdsSelected
    })
    showAlert({
      message: t('common.saveFile.success'),
      severity: 'success',
      variant: 'filled'
    })
    _onClose()
  }
  const isLoading = currentEditInformation.isLoading || isLoadingContacts

  if (!isLoading && !currentEditInformation.file) {
    if (onClose) {
      onClose()
    } else {
      return <Navigate to=".." />
    }
  }

  return isLoading ? (
    <Backdrop open classes={{ root: classes.backdropRoot }}>
      <Spinner size="xlarge" />
    </Backdrop>
  ) : (
    <ContactEditDialog
      contacts={contacts}
      currentEditInformation={currentEditInformation}
      onConfirm={onConfirm}
      onClose={_onClose}
      isBusy={isBusy}
    />
  )
}

export default ContactEdit
