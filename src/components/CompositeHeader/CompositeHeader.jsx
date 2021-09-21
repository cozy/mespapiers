import React, { useState, useEffect, isValidElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isArray from 'lodash/isArray'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon, { iconPropType } from 'cozy-ui/transpiled/react/Icon'

import './styles.styl'

// TODO Test and improve it & PR cozy-ui
const CompositeHeader = ({
  icon,
  fallbackIcon,
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
      let src = await import(`src/assets/icons/${icon}`).catch(() => ({
        default: fallbackIcon
      }))
      isMounted && setImgSrc(src.default)
    })()

    return () => {
      isMounted = false
    }
  }, [icon, fallbackIcon])

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
          <Typography variant="h5" color="textPrimary">
            {Title}
          </Typography>
        ))}
      {Text &&
        (isValidElement(Text) || isArray(Text) ? (
          <div className={'u-mt-1'}>{Text}</div>
        ) : (
          <Typography variant="body1" className={'u-mt-1'}>
            {Text}
          </Typography>
        ))}
    </div>
  )
}

CompositeHeader.propTypes = {
  icon: iconPropType,
  fallbackIcon: iconPropType,
  iconSize: PropTypes.oneOf(['small', 'normal', 'medium', 'large']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
}
CompositeHeader.defaultProps = {
  iconSize: 'normal'
}

export default CompositeHeader
