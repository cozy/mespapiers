import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useStepperDialogContext } from 'components/Hooks/useStepperDialogContext'
import StepperDialog from 'components/StepperDialog/StepperDialog'
import LazyLoad from 'components/LazyLoad/LazyLoad'

const Content = () => {
  const { allCurrentPages, currentPageIndex } = useStepperDialogContext()

  return allCurrentPages.map(
    page =>
      page.pageIndex === currentPageIndex && (
        <React.Fragment key={page.pageIndex}>
          <LazyLoad currentPage={page} />
        </React.Fragment>
      )
  )
}

const StepperDialogWrapper = () => {
  const { t } = useI18n()
  const {
    allCurrentPages,
    currentPageIndex,
    previousPage,
    stepperDialogTitle
  } = useStepperDialogContext()

  return (
    <StepperDialog
      open
      onClose={previousPage}
      title={t(`items.${stepperDialogTitle}`)}
      content={<Content />}
      stepper={`${currentPageIndex}/${allCurrentPages.length}`}
    />
  )
}

export default StepperDialogWrapper
