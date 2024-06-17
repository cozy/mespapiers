import addDays from 'date-fns/addDays'
import PropTypes from 'prop-types'
import React from 'react'
import BoxDate from 'src/components/Multiselect/BoxDate'
import BoxPassword from 'src/components/Multiselect/BoxPassword'

import { useClient } from 'cozy-client'
import { getDisplayName } from 'cozy-client/dist/models/contact'
import { isNote } from 'cozy-client/dist/models/file'
import { isMobile } from 'cozy-device-helper'
import { FileImageLoader } from 'cozy-ui/transpiled/react/FileImageLoader'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Skeleton from 'cozy-ui/transpiled/react/Skeleton'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const styles = {
  image: {
    maxHeight: 64,
    maxWidth: 64
  }
}

const PASSWORD_MIN_LENGTH = 4

export const ForwardModalContent = ({
  files,
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

  const isMultipleFile = files.length > 1
  const displayName =
    isMultipleFile && currentUser
      ? t('Multiselect.folderZipName', {
          contactName: getDisplayName(currentUser),
          date: f(Date.now(), 'YYYY.MM.DD')
        })
      : files[0].name

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
        {!isMultipleFile ? (
          <FileImageLoader
            client={client}
            file={files[0]}
            linkType="tiny"
            render={src => {
              return src ? (
                <img src={src} alt="" style={styles.image} />
              ) : (
                <Skeleton variant="rect" animation="wave" />
              )
            }}
            renderFallback={() => (
              <Icon
                icon={isNote(files[0]) ? 'file-type-note' : 'file-type-files'}
                size={64}
              />
            )}
          />
        ) : (
          <Icon icon="file-type-zip" size={64} />
        )}
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
  files: PropTypes.array,
  currentUser: PropTypes.object
}
