import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const previousColorStyle = { color: 'var(--actionColorActive)' }

const Breadcrumb = ({ path, onBreadcrumbClick }) => {
  const { isMobile } = useBreakpoints()

  const navigateTo = useCallback(folder => () => onBreadcrumbClick(folder), [
    onBreadcrumbClick
  ])

  return (
    <Typography variant="h4" className={'u-flex u-flex-items-center'}>
      {isMobile
        ? path[path.length - 1]?.name
        : path.map((folder, index) => {
            if (index < path.length - 1) {
              return (
                <Fragment key={index}>
                  <span
                    className={'u-c-pointer'}
                    style={previousColorStyle}
                    onClick={navigateTo(folder)}
                  >
                    {folder.name}
                  </span>
                  {!isMobile && (
                    <Icon icon={RightIcon} style={previousColorStyle} />
                  )}
                </Fragment>
              )
            } else {
              return (
                <span key={index}>
                  {folder.name}
                  {path.length >= 2 && isMobile && <Icon icon={BottomIcon} />}
                </span>
              )
            }
          })}
    </Typography>
  )
}

Breadcrumb.propTypes = {
  path: PropTypes.array,
  onBreadcrumbClick: PropTypes.func
}

export default Breadcrumb
