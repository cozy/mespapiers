import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { FixedDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import FilePickerHeader from './FilePickerHeader'
import Footer from './FilePickerFooter'
import FilePickerContent from './FilePickerContent'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    '& >div:nth-child(4)': {
      padding: 0
    },
    [theme.breakpoints.down('sm')]: {
      '& >div:first-child': {
        display: 'none'
      }
    }
  }
}))

const ROOT_DIR_ID = 'io.cozy.files.root-dir'

const FilePicker = ({ onClose, onError, selectedFile }) => {
  const classes = useStyles()
  const [folderId, setFolderId] = useState(ROOT_DIR_ID)

  const navigateTo = folder => setFolderId(folder.id)

  return (
    <FixedDialog
      open
      disableTitleAutoPadding
      onClose={onClose}
      size="large"
      classes={{
        paper: classes.paper
      }}
      title={<FilePickerHeader navigateTo={navigateTo} folderId={folderId} />}
      content={
        <FilePickerContent
          navigateTo={navigateTo}
          folderId={folderId}
          selectedFile={selectedFile}
          onClose={onClose}
          onError={onError}
        />
      }
      actions={<Footer onClose={onClose} onConfirm={() => {}} />}
    />
  )
}

FilePicker.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedFile: PropTypes.func.isRequired,
  onError: PropTypes.func
}

export default FilePicker
