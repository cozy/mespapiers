import PropTypes from 'prop-types'

const paperDefinitionsStepAttrProptypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
})

const paperDefinitionsStepProptypes = PropTypes.shape({
  stepIndex: PropTypes.number.isRequired,
  occurrence: PropTypes.number,
  model: PropTypes.string.isRequired,
  illustration: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(paperDefinitionsStepAttrProptypes)
})

export const paperDefinitionsProptypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  featuredPlaceholder: PropTypes.bool.isRequired,
  placeholderIndex: PropTypes.number,
  steps: PropTypes.arrayOf(paperDefinitionsStepProptypes).isRequired,
  featureDate: PropTypes.string,
  maxDisplay: PropTypes.number.isRequired
})
