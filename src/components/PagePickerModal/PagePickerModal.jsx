import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { PagePickerModalContentHeader } from 'src/components/PagePickerModal/PagePickerModalContentHeader'
import { PagePickerModalItem } from 'src/components/PagePickerModal/PagePickerModalItem'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Divider from 'cozy-ui/transpiled/react/Divider'
import List from 'cozy-ui/transpiled/react/List'
import Paper from 'cozy-ui/transpiled/react/Paper'

/**
 * @type {import('../../types').PagePickerOption[][]}
 */
const pagePickerDefaultOptions = [
  [
    { value: 'front', labelKey: 'Multiselect.page.front' },
    { value: 'back', labelKey: 'Multiselect.page.back' }
  ],
  [{ value: 'split', labelKey: 'PagePickerModal.splitFile', master: true }]
]

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
  const [selectedChoice, setSelectedChoice] = useState([])
  const hasMasterChoice = options.flat().some(option => option.master)
  const disabledConfirm =
    hasMasterChoice &&
    selectedChoice.length === 1 &&
    selectedChoice.some(selChoice => selChoice.master)

  const handleChange = option => {
    if (selectedChoice.some(selChoice => selChoice.value === option.value)) {
      if (option.master) {
        return setSelectedChoice([])
      }
      setSelectedChoice(prevChoices =>
        prevChoices.filter(choice => option.value !== choice.value)
      )
    } else {
      if (option.master) {
        return setSelectedChoice(options.flat())
      }
      setSelectedChoice(choices => [...choices, option])
    }
  }

  const handleConfirm = () => {
    onClick(selectedChoice)
    setSelectedChoice([])
    onClose()
  }

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      content={
        <>
          <PagePickerModalContentHeader file={file} />
          <div className="u-stack-m">
            {options.map((optionGr, indexOptGr) => (
              <Paper key={indexOptGr}>
                <List className="u-p-0">
                  {optionGr.map((option, indexOption) => (
                    <Fragment key={`'${indexOptGr}${indexOption}`}>
                      <PagePickerModalItem
                        option={option}
                        hasMasterChoice={hasMasterChoice}
                        selectedChoice={selectedChoice}
                        onChange={handleChange}
                      />
                      {indexOption !== optionGr.length - 1 && (
                        <Divider component="li" variant="inset" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </Paper>
            ))}
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
        value: PropTypes.string.isRequired,
        master: PropTypes.bool
      })
    )
  ),
  textAction: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
}
