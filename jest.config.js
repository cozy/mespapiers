module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '.styl$': 'identity-obj-proxy',
    '^cozy-client$': 'cozy-client/dist/index',
    '^root/(.*)': '<rootDir>/src/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
    '^assets/(.*)': '<rootDir>/src/assets/$1',
    '^constants/(.*)': '<rootDir>/src/constants/$1',
    '^test/(.*)': '<rootDir>/test/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui)'],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  }
}
