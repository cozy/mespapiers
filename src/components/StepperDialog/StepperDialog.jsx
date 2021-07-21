import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {
  useCozyDialog,
  DialogBackButton,
  DialogCloseButton
} from 'cozy-ui/transpiled/react/CozyDialogs'
import MUIDialog, {
  DialogTitle,
  DialogContent
} from 'cozy-ui/transpiled/react/Dialog'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

// TODO Test and improve it & PR cozy-ui
const StepperDialog = props => {
  const { onClose, title, content } = props
  const { dialogProps, dialogTitleProps, fullScreen, id } = useCozyDialog(props)

  return (
    <MUIDialog {...dialogProps}>
      {!fullScreen && onClose && (
        <DialogCloseButton
          onClick={onClose}
          data-test-id={`modal-close-button-${id}`}
        />
      )}
      <DialogTitle
        {...dialogTitleProps}
        className={cx('u-ellipsis', { dialogTitleFull: !onClose })}
      >
        {fullScreen && onClose && <DialogBackButton onClick={onClose} />}
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent classes={{ root: 'actionsInContent' }}>
        {content}
      </DialogContent>
    </MUIDialog>
  )
}

StepperDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node,
  content: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default StepperDialog
