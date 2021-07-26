import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useStepperDialogContext } from '../Hooks'
import { StepperDialog } from '../StepperDialog'

const StepperDialogWrapper = () => {
  const { t } = useI18n()
  const {
    allCurrentPages,
    currentPage,
    stepperDialogTitle,
    previousPage
  } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageNumber === currentPage && (
        <StepperDialog
          key={page.pageNumber}
          open
          onClose={previousPage}
          title={t(`items.${stepperDialogTitle}`)}
          // TODO content={<LazyloadComponent />}
          stepper={`${currentPage}/${allCurrentPages.length}`}
        />
      )
  )
}

export default StepperDialogWrapper
