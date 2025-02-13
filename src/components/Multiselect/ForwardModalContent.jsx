import addDays from 'date-fns/addDays'
import PropTypes from 'prop-types'
import React from 'react'
import { makeFilenameWithPage } from 'src/components/Actions/utils'
import BoxDate from 'src/components/Multiselect/BoxDate'
import BoxPassword from 'src/components/Multiselect/BoxPassword'
import { renderImage } from 'src/components/Multiselect/helpers'

import { useClient } from 'cozy-client'
import { getDisplayName } from 'cozy-client/dist/models/contact'
import { isMobile } from 'cozy-device-helper'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const PASSWORD_MIN_LENGTH = 4

export const ForwardModalContent = ({
  filesWithPage,
  currentUser,
  setIsValidPassword,
  helperTextPassword,
  setIsValidDate,
  helperTextDate,
  dateToggle,
  setDateToggle,
  passwordToggle,
  setPasswordToggle,
  selectedDate,
  setSelectedDate,
  password,
  setPassword
}) => {
  const client = useClient()
  const { t, f } = useI18n()

  const isDesktopOrMobileWithoutShareAPI =
    (isMobile() && !navigator.share) || !isMobile()

  const isMultipleFile = filesWithPage.length > 1
  const displayName =
    isMultipleFile && currentUser
      ? t('Multiselect.folderZipName', {
          contactName: getDisplayName(currentUser),
          date: f(Date.now(), 'yyyy.LL.dd')
        })
      : makeFilenameWithPage({
          file: filesWithPage[0].file,
          page: filesWithPage[0].page,
          t
        })

  const handlePasswordToggle = val => {
    setPasswordToggle(val)
  }
  const handlePassword = evt => {
    const value = evt.target.value
    setPassword(value)
    setIsValidPassword(
      value.length === 0 || value.length >= PASSWORD_MIN_LENGTH
    )
  }

  const handleDateToggle = val => {
    if (!val) {
      setIsValidDate(true)
    }
    const defaultValue = val ? addDays(new Date(), 30) : null
    setSelectedDate(defaultValue)
    setDateToggle(val)
  }

  const textContent = isDesktopOrMobileWithoutShareAPI
    ? t('ForwardModal.content.desktop', {
        smart_count: isMultipleFile
      })
    : t('ForwardModal.content.mobile', {
        smart_count: isMultipleFile
      })

  return (
    <>
      <div className="u-ta-center u-mb-1">
        {renderImage({
          client,
          file: filesWithPage[0].file,
          hasPage: !!filesWithPage[0].page,
          isMultipleFile
        })}
        <Typography variant="h5" className="u-mv-1">
          {displayName}
        </Typography>
        <Typography>{textContent}</Typography>
      </div>
      <BoxDate
        isValid={setIsValidDate}
        onChange={setSelectedDate}
        date={selectedDate}
        onToggle={handleDateToggle}
        toggle={dateToggle}
        helperText={helperTextDate}
      />
      <BoxPassword
        onChange={handlePassword}
        password={password}
        onToggle={handlePasswordToggle}
        toggle={passwordToggle}
        helperText={helperTextPassword}
        inputProps={{ minLength: PASSWORD_MIN_LENGTH }}
      />
    </>
  )
}

ForwardModalContent.propTypes = {
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
