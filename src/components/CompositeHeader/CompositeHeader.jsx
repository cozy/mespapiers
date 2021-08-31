import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './styles.styl'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'

// TODO Test and improve it & PR cozy-ui
const CompositeHeader = ({ icon, title, text, className, ...restProps }) => {
  const [imgScr, setImgSrc] = useState(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const src = await import(`src/assets/icons/${icon}`)
      isMounted && setImgSrc(src.default)
    })()

    return () => {
      isMounted = false
    }
  }, [icon])

  return (
    <div className={cx('composite-header-container', className)} {...restProps}>
      {imgScr && (
        <Icon className={'composite-header-img'} icon={imgScr} size="100%" />
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
