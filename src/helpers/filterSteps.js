import { isFlagshipOCRAvailable } from 'src/helpers/isFlagshipOCRAvailable'
import { isSomePaperStepsCompliantWithOCR } from 'src/helpers/isSomePaperStepsCompliantWithOCR'

/**
 * Filter a list of step with OCR contraint
 * @param {object[]} steps list of step
 * @param {Object} [webviewIntent] - The webview intent service to interact with the native environment.
 * @param {boolean} [isEdit] - True if the current view is an edit view
 * @param {Function} [stepFilterFn] - The filter function to apply on the steps
 * @param {boolean} [fromFlagshipUpload] - True if the current view is from the flagship upload
 * @returns {Promise<object[]>} list of step filtered
 */
export const filterSteps = async ({
  steps,
  webviewIntent,
  isEdit,
  stepFilterFn,
  fromFlagshipUpload
}) => {
  const isOCR =
    !isEdit &&
    !fromFlagshipUpload &&
    isSomePaperStepsCompliantWithOCR(steps) &&
    (await isFlagshipOCRAvailable(webviewIntent))
  const stepsDisplayed = steps.filter(step => {
    if (isOCR) {
      return step.isDisplayed === 'all' || step.isDisplayed === 'ocr'
    } else {
      return step?.isDisplayed !== 'ocr'
    }
  })

  return typeof stepFilterFn === 'function'
    ? stepsDisplayed.filter(stepFilterFn)
    : stepsDisplayed
}
