const merge = require('webpack-merge')
const config = [
  require('cozy-scripts/config/webpack.bundle.default.js'),
  require('./app.services')
]

const extraConfig = {
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      'react-pdf$': 'react-pdf/dist/esm/entry.webpack'
    }
  },
  module: {
    // mjml-core/lib/helpers/mjmlconfig and encoding/lib/iconv-loader use
    // expressions inside require. We do not need the functionality provided
    // by the dynamic require
    exprContextRegExp: /$^/,
    exprContextCritical: false
  }
}
config.push(extraConfig)

module.exports = [merge.apply(null, config)]
