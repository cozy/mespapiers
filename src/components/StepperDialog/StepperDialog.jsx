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
import Typography from 'cozy-ui/transpiled/react/Typography'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

// TODO Test and improve it & PR cozy-ui
const StepperDialog = props => {
  const { onClose, title, content } = props

  // TODO While waiting for the update of useCozyDialog which should destruct "stepper"
  const { stepper, ...rest } = props
  const { dialogProps, dialogTitleProps, fullScreen, id } = useCozyDialog(rest)

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
        className={cx('u-ellipsis', {
          dialogTitleFull: !onClose,
          ['u-flex u-flex-justify-between u-flex-items-center']: stepper
        })}
      >
        <div className={'u-flex'}>
          {fullScreen && onClose && <DialogBackButton onClick={onClose} />}
          <Typography variant="h4">{title}</Typography>
        </div>
        {stepper && <Typography variant="h6">{stepper}</Typography>}
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
