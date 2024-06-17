import addDays from 'date-fns/addDays'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { forwardFile, makeZipFolder } from 'src/components/Actions/utils'
import { ForwardModalContent } from 'src/components/Multiselect/ForwardModalContent'
import { copyToClipboard } from 'src/helpers/copyToClipboard'
import { makeTTL } from 'src/helpers/makeTTL'

import { useClient } from 'cozy-client'
import { getSharingLink } from 'cozy-client/dist/models/sharing'
import { isMobile } from 'cozy-device-helper'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const PASSWORD_MIN_LENGTH = 4

export const ForwardModal = ({ onClose, onForward, files, currentUser }) => {
  const client = useClient()
  const { t, f } = useI18n()
  const { showAlert } = useAlert()
  const [password, setPassword] = useState('')
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 30))
  const [isValidDate, setIsValidDate] = useState(true)
  const [isBusy, setIsBusy] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [dateToggle, setDateToggle] = useState(true)
  const [passwordToggle, setPasswordToggle] = useState(false)

  const isDesktopOrMobileWithoutShareAPI =
    (isMobile() && !navigator.share) || !isMobile()

  const isMultipleFile = files.length > 1

  const helperTextPassword = !isValidPassword
    ? t('InputTextAdapter.invalidTextMessage', {
        smart_count: PASSWORD_MIN_LENGTH - password.length
      })
    : null

  const helperTextDate = t('InputDateAdapter.invalidDateMessage')

  const handleClick = async () => {
    let file = files[0]
    if (isMultipleFile) {
      setIsBusy(true)
      file = await makeZipFolder({ client, docs: files, t, f })
    }
    const ttl = makeTTL(dateToggle && selectedDate)
    if (isDesktopOrMobileWithoutShareAPI) {
      const url = await getSharingLink(client, [file._id], {
        ttl,
        password
      })
      await copyToClipboard(url, { t, showAlert })
      onForward?.()
    } else {
      await forwardFile({ client, files: [file], t, ttl, password, showAlert })
      onForward?.()
    }
  }

  const textAction = isDesktopOrMobileWithoutShareAPI
    ? t('ForwardModal.action.desktop')
    : t('ForwardModal.action.mobile')

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      data-testid="ForwardModal"
      content={
        <ForwardModalContent
          files={files}
          currentUser={currentUser}
          setIsValidPassword={setIsValidPassword}
          setIsValidDate={setIsValidDate}
          helperTextDate={helperTextDate}
          helperTextPassword={helperTextPassword}
          dateToggle={dateToggle}
          setDateToggle={setDateToggle}
          passwordToggle={passwordToggle}
          setPasswordToggle={setPasswordToggle}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          password={password}
          setPassword={setPassword}
        />
      }
      actions={
        <Button
          label={textAction}
          onClick={handleClick}
          disabled={!isValidDate || !isValidPassword || isBusy}
        />
      }
    />
  )
}

ForwardModal.propTypes = {
  onForward: PropTypes.func,
  onClose: PropTypes.func,
  files: PropTypes.array,
  currentUser: PropTypes.object
}
