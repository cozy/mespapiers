import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'

// TODO Test and improve it & PR cozy-ui
const CompositeHeader = ({ icon, title, text, className, ...restProps }) => {
  return (
    <div className={cx('composite-header-container', className)} {...restProps}>
      {icon && (
        <Icon
          className={'composite-header-img'}
          icon={icon}
          width="100%"
          height="100%"
        />
      )}
      {title && (
        <Typography gutterBottom variant="h5" color="textPrimary">
          {title}
        </Typography>
      )}
      {text && (
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
      )}
    </div>
  )
}

CompositeHeader.propTypes = {
  icon: iconPropType,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  className: PropTypes.string
}

export default CompositeHeader
