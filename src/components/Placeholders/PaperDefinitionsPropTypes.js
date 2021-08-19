import PropTypes from 'prop-types'

const paperDefinitionsPageAttrProptypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
})

const paperDefinitionsPageProptypes = PropTypes.shape({
  pageIndex: PropTypes.number.isRequired,
  occurrence: PropTypes.number,
  model: PropTypes.string.isRequired,
  illustration: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(paperDefinitionsPageAttrProptypes)
})

export const paperDefinitionsProptypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  featuredPlaceholder: PropTypes.bool.isRequired,
  placeholderIndex: PropTypes.number,
  pages: PropTypes.arrayOf(paperDefinitionsPageProptypes).isRequired,
  featureDate: PropTypes.string,
  maxDisplay: PropTypes.number.isRequired
})
