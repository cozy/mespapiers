const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const {
  target,
  eslintFix,
  getFilename
} = require('cozy-scripts/config/webpack.vars')
const pathCS = require('cozy-scripts/utils/paths')

const SRC_DIR = path.resolve(__dirname, 'src')

const serviceDir = path.resolve(SRC_DIR, './targets/services/')
const servicesPaths = fs.existsSync(serviceDir)
  ? fs.readdirSync(serviceDir)
  : []

const servicesEntries = {}
servicesPaths.forEach(file => {
  if (!file.match(/^[^.]*.js$/)) return
  const filename = file.match(/^([^.]*).js$/)[1]
  servicesEntries[filename] = path.resolve(path.join(serviceDir, file))
})

const config = {
  __mergeStrategy: {
    smart: false,
    strategy: {
      plugins: 'replace',
      output: 'replace',
      entry: 'replace',
      optimization: 'replace',
      module: 'replace',
      externals: 'replace'
    }
  },
  entry: servicesEntries,
  output: {
    path: pathCS.appServicesBuild(),
    filename: `${getFilename(false)}.js`
  },
  target: 'node',
  optimization: {
    minimize: false
  },
  devtool: false,
  externals: [], // reset externals property
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: require.resolve('cozy-scripts/node_modules/eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app'],
          fix: eslintFix,
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|cozy-(bar|client-js))/,
        loader: require.resolve('cozy-scripts/node_modules/babel-loader'),
        options: {
          cacheDirectory: 'cozy-scripts/node_modules/.cache/babel-loader/node',
          babelrc: false,
          presets: [['cozy-app', { node: true, react: false }]]
        }
      }
    ],
    // Dynamic requires produce warnings in webpack. Some of our dependencies
    // use them for features we do not use, so we can disable them.
    // More information : https://gitlab.cozycloud.cc/labs/cozy-bank/merge_requests/197#note_4018
    exprContextRegExp: /$^/,
    exprContextCritical: false
  },
  resolve: {
    alias: {
      // We are building with target: node as webpack options. This causes webpack
      // to consider the "module" entrypoint from node-fetch. This does not work properly
      // as require('node-fetch') returns a module object (with the default property).
      // Here, we force the resolution to take the commonJS file.
      // TODO See if it is necessary to integrate in cozy-scripts
      'node-fetch': 'node-fetch/lib/index.js',
      // Unminified Handlebars uses `require.extensions` and this causes
      // warnings on Webpack. We should think of a way to precompile
      // our Handlebars template. At the moment it is not possible
      // since we pass helpers at runtime.
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    })
  ]
}

/* We don't build services if no services and if on mobile build */
const addServicesConfig =
  target === 'browser' && Object.keys(servicesEntries).length

// only for browser target (services are usable only on cozy-stack)
module.exports = addServicesConfig ? { multiple: { services: config } } : {}
