/* eslint-disable no-console */
const {
  getAppDependencies,
  getPackagesToUpdate,
  updatePackages,
  getLibPackageJSON,
  createPRDescription,
  cleanPackagesToUpdate
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
    const packagesToUpdate = []

    for (const libName of libs) {
      packagesToUpdate.push(...(await run(libName)))
    }
    const packagesToUpdateFiltered = cleanPackagesToUpdate(packagesToUpdate)

    await updatePackages(packagesToUpdateFiltered)
    console.info(`Upgrade packages successful`)

    await createPRDescription(packagesToUpdateFiltered)
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
