import get from 'lodash/get'

import papersJSON from 'src/constants/papersDefinitions.json'

/**
 * @typedef {Object} StepAttributes
 * @property {string} name - Name of the attribute.
 * @property {string} type - Type of the attribute.
 */
/**
 * @typedef {Object} Step
 * @property {number} stepIndex - Position of the step.
 * @property {number} occurrence - Number of occurrence for this step.
 * @property {string} illustration - Name of the illustration.
 * @property {string} text - Text of the step.
 * @property {StepAttributes[]} attributes - Array of the attributes.
 */
/**
 * @typedef {Object} Paper
 * @property {string} label - Label of Paper.
 * @property {string} icon - Icon of Paper.
 * @property {boolean} featuredPlaceholder - Is visible on the Homepage.
 * @property {number} placeholderIndex - Position on the Placeholder list.
 * @property {Step[]} steps - Array of steps.
 * @property {string} featureDate - Reference the attribute "name" to be used as main date.
 * @property {number} maxDisplay - Number of document beyond which a "see more" button is displayed.
 */

/**
 * Filters and sorts the list of PlaceHolders
 * @param {Paper[]} papers Array of Papers
 * @returns an array of Papers filtered with the prop "featuredPlaceholder",
 * which does not already exist in DB and
 * which sorted with the prop "placeholderIndex"
 */
export const getPlaceholders = (papers = []) =>
  papersJSON.papersDefinitions
    .filter(
      paperDefinition =>
        !papers.some(
          paper =>
            get(paper, 'metadata.qualification.label') === paperDefinition.label
        ) && paperDefinition.featuredPlaceholder
    )
    .sort((a, b) => a.placeholderIndex - b.placeholderIndex)
