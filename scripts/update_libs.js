/* eslint-disable no-console */
const {
  getAppDependencies,
  getPackagesToUpdate,
  updatePackages,
  getLibPackageJSON,
  createPRDescription
} = require('./utils')

/**
 * @param {string} libName
 * @returns
 */
const run = async libName => {
  try {
    const { version: libVersion, peerDependencies: libPeerDeps } =
      await getLibPackageJSON(libName)

    const appDeps = await getAppDependencies()
    const packagesToUpdate = getPackagesToUpdate({
      libPeerDeps,
      libName,
      libVersion,
      appDeps
    })
    await updatePackages(packagesToUpdate)
    console.info(`Upgrade packages successful`)
    await createPRDescription(packagesToUpdate)

    return Promise.resolve(packagesToUpdate)
  } catch (error) {
    return Promise.reject({ libName, message: error.message })
  }
}

/**
 * @param {Opts} opts
 */
const main = async opts => {
  try {
    const { libs } = opts

    for (const libName of libs) {
      await run(libName)
    }
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * @typedef Opts
 * @property {string[]} libs - Name of libs
 */
const opts = {
  libs: ['cozy-mespapiers-lib']
}

main(opts)
