import addDays from 'date-fns/addDays'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { forwardFile, makeZipFolder } from 'src/components/Actions/utils'
import { ForwardModalContent } from 'src/components/Multiselect/ForwardModalContent'
import { LinearBackdrop } from 'src/components/Multiselect/LinearBackdrop'
import { createPdfFileByPage } from 'src/components/Multiselect/helpers'
import { copyToClipboard } from 'src/helpers/copyToClipboard'
import { makeTTL } from 'src/helpers/makeTTL'

import { useClient } from 'cozy-client'
import { makeSharingLink } from 'cozy-client/dist/models/sharing'
import { isMobile } from 'cozy-device-helper'
import minilog from 'cozy-minilog'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const log = minilog('ForwardModal')

const PASSWORD_MIN_LENGTH = 4

export const ForwardModal = ({
  onClose,
  onForward,
  filesWithPage,
  currentUser
}) => {
  const client = useClient()
  const { t, f } = useI18n()
  const { showAlert } = useAlert()
  const [password, setPassword] = useState('')
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 30))
  const [isValidDate, setIsValidDate] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [dateToggle, setDateToggle] = useState(true)
  const [passwordToggle, setPasswordToggle] = useState(false)
  const [forwardedFile, setForwardedFile] = useState()

  const isDesktopOrMobileWithoutShareAPI =
    (isMobile() && !navigator.share) || !isMobile()

  const isMultipleFile = filesWithPage.length > 1

  const helperTextPassword = !isValidPassword
    ? t('InputTextAdapter.invalidTextMessage', {
        smart_count: PASSWORD_MIN_LENGTH - password.length
      })
    : null

  const helperTextDate = t('InputDateAdapter.invalidDateMessage')

  useEffect(() => {
    const init = async () => {
      let file = filesWithPage[0].file
      try {
        if (isMultipleFile) {
          file = await makeZipFolder({
            client,
            currentUser,
            filesWithPage,
            t,
            f
          })
        } else {
          if (filesWithPage[0].page) {
            const newFile = await createPdfFileByPage({
              client,
              t,
              filesWithSpecificPage: filesWithPage
            })
            file = newFile[0]
          }
        }
        setForwardedFile(file)
      } catch (error) {
        log.error(`Error in init function: ${error}`)
        showAlert({
          message: t('ForwardModal.error.init'),
          severity: 'error',
          variant: 'filled'
        })
        onForward?.()
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!forwardedFile) {
    return <LinearBackdrop text={t('Multiselect.backdrop')} />
  }

  const handleClick = async () => {
    const ttl = makeTTL(dateToggle && selectedDate)
    if (isDesktopOrMobileWithoutShareAPI) {
      const url = await makeSharingLink(client, [forwardedFile._id], {
        ttl,
        password
      })
      await copyToClipboard(url, { t, showAlert })
      onForward?.()
    } else {
      await forwardFile({
        client,
        files: [forwardedFile],
        t,
        ttl,
        password,
        showAlert
      })
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
          filesWithPage={filesWithPage}
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
          disabled={!isValidDate || !isValidPassword}
        />
      }
    />
  )
}

ForwardModal.propTypes = {
  onForward: PropTypes.func,
  onClose: PropTypes.func,
  filesWithPage: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.object,
      page: PropTypes.string
    })
  ),
  currentUser: PropTypes.object
}
