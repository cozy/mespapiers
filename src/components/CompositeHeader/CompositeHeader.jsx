import React, { useState, useEffect, isValidElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './styles.styl'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'

// TODO Test and improve it & PR cozy-ui
const CompositeHeader = ({
  icon,
  iconSize,
  title: Title,
  text: Text,
  className,
  ...restProps
}) => {
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
        <Icon
          className={cx('composite-header-img', {
            [`composite-header-img--${iconSize}`]: iconSize !== 'normal'
          })}
          icon={imgScr}
          size={'100%'}
        />
      )}
      {Title &&
        (isValidElement(Title) ? (
          Title
        ) : (
          <Typography gutterBottom variant="h5" color="textPrimary">
            {Title}
          </Typography>
        ))}
      {Text &&
        (isValidElement(Text) ? (
          Text
        ) : (
          <Typography variant="body1" gutterBottom>
            {Text}
          </Typography>
        ))}
    </div>
  )
}

CompositeHeader.propTypes = {
  icon: iconPropType,
  iconSize: PropTypes.oneOf(['small', 'normal', 'medium', 'large']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string
}
CompositeHeader.defaultProps = {
  iconSize: 'normal'
}

export default CompositeHeader
