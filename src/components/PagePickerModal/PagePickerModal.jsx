import PropTypes from 'prop-types'
import React, { Fragment, useReducer, useState } from 'react'
import { PagePickerModalContentHeader } from 'src/components/PagePickerModal/PagePickerModalContentHeader'
import { PagePickerModalItem } from 'src/components/PagePickerModal/PagePickerModalItem'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Checkbox from 'cozy-ui/transpiled/react/Checkbox'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Divider from 'cozy-ui/transpiled/react/Divider'
import List from 'cozy-ui/transpiled/react/List'
import Paper from 'cozy-ui/transpiled/react/Paper'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

/**
 * @type {import('../../types').PagePickerOption[]}
 */
const pagePickerDefaultOptions = [
  { name: 'front', labelKey: 'Multiselect.page.front' },
  { name: 'back', labelKey: 'Multiselect.page.back' }
]
const splitFileOption = {
  name: 'split',
  labelKey: 'PagePickerModal.splitFile'
}

export const PagePickerModal = ({
  onClose,
  file,
  options = pagePickerDefaultOptions,
  onClick,
  textAction
}) => {
  /**
   * @type {[import('../../types').PagePickerOption[], import('react').Dispatch<import('react').SetStateAction<import('../../types').PagePickerOption[]>>]}
   */
  const [selectedFaces, setSelectedFaces] = useState(pagePickerDefaultOptions)
  const allFacesSelected =
    selectedFaces.length === pagePickerDefaultOptions.length
  const [splitFileCheck, toggleSplitFileCheck] = useReducer(
    splitFileOption => !splitFileOption && allFacesSelected,
    false
  )
  const { t } = useI18n()
  const disabledConfirm = selectedFaces.length === 0

  const handleFaceChange = option => {
    if (selectedFaces.some(selChoice => selChoice.name === option.name)) {
      if (allFacesSelected) {
        toggleSplitFileCheck()
      }
      setSelectedFaces(prevChoices =>
        prevChoices.filter(choice => option.name !== choice.name)
      )
    } else {
      setSelectedFaces(choices => [...choices, option])
    }
  }

  const handleConfirm = () => {
    const options = splitFileCheck
      ? [splitFileOption, ...selectedFaces]
      : selectedFaces

    onClick(options)
    setSelectedFaces([])
    onClose()
  }

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      content={
        <>
          <PagePickerModalContentHeader file={file} />
          <div className="u-stack-xs">
            <Paper>
              <List className="u-p-0">
                {options.map((option, indexOption) => (
                  <Fragment key={indexOption}>
                    <PagePickerModalItem
                      option={option}
                      selectedFaces={selectedFaces}
                      onChange={handleFaceChange}
                    />
                    {indexOption !== options.length - 1 && (
                      <Divider component="li" variant="inset" />
                    )}
                  </Fragment>
                ))}
              </List>
            </Paper>
            <Checkbox
              className="u-ml-0"
              checked={splitFileCheck}
              disabled={!allFacesSelected}
              label={t(splitFileOption.labelKey)}
              name={splitFileOption.name}
              onChange={toggleSplitFileCheck}
            />
          </div>
        </>
      }
      actions={
        <Button
          label={textAction}
          onClick={handleConfirm}
          fullWidth
          disabled={disabledConfirm}
        />
      }
    />
  )
}

PagePickerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        labelKey: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  ),
  textAction: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
}
