const path = require(`path`)
const SRC_DIR = path.resolve(__dirname, '../src')
const TEST_DIR = path.resolve(__dirname, '../test')

module.exports = {
  resolve: {
    alias: {
      // For autocompletion, remember to inform the "jsconfig.json" file in the project root
      // For tests, remember to inform the "jest.config.js" file in the project root
      root: SRC_DIR,
      components: path.resolve(SRC_DIR, './components'),
      utils: path.resolve(SRC_DIR, './utils'),
      assets: path.resolve(SRC_DIR, './assets'),
      constants: path.resolve(SRC_DIR, './constants'),
      test: TEST_DIR
    }
  }
}
