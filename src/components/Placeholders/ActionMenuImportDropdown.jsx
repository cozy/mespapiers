import React from 'react'

import ActionMenu from 'cozy-ui/transpiled/react/ActionMenu'

import ImportDropdown from 'src/components/ImportDropdown/ImportDropdown'

const ActionMenuImportDropdown = ({
  className,
  isOpened,
  placeholder,
  onClose,
  anchorElRef
}) => {
  if (!isOpened) {
    return null
  }

  return (
    <ActionMenu
      className={className}
      anchorElRef={anchorElRef}
      onClose={onClose}
    >
      <ImportDropdown
        label={placeholder.label}
        icon={placeholder.icon}
        hasSteps={placeholder?.acquisitionSteps.length > 0}
        onClose={onClose}
      />
    </ActionMenu>
  )
}

export default ActionMenuImportDropdown
