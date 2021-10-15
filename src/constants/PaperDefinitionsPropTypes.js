import PropTypes from 'prop-types'

const paperDefinitionsStepAttrProptypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
})

export const paperDefinitionsStepProptypes = PropTypes.shape({
  stepIndex: PropTypes.number.isRequired,
  model: PropTypes.string.isRequired,
  multipage: PropTypes.bool,
  page: PropTypes.string,
  illustration: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(paperDefinitionsStepAttrProptypes)
})

export const paperDefinitionsProptypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholderIndex: PropTypes.number,
  acquisitionSteps: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(paperDefinitionsStepProptypes).isRequired
  ]),
  featureDate: PropTypes.string,
  maxDisplay: PropTypes.number.isRequired
})
