/* eslint-disable no-console */
const { satisfies } = require('compare-versions')
const { resolve } = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const execPromise = promisify(exec)
const {
  promises: { readFile, writeFile }
} = require('fs')

/**
 * @typedef {Object} PackageToUpdate
 * @property {string} name - Name of the package
 * @property {string} appDepVersion - Version of the package in the app
 * @property {string} requiredDepVersion - Version of the package required by the lib
 * @property {boolean} needUpdate - Does the package need to be updated
 */

const prBodyFilename = 'prBody.md'

/**
 * @param {string} path - Path of the file
 * @returns {Promise<string>} - Content of the file
 */
const getFileContent = path => {
  return readFile(resolve(path), { encoding: 'utf8' })
}

/**
 * Get dependency without "^"|">"|"<"|"=" symbols
 * @param {string} dependency - Name of the dependency
 * @returns {string} - Normalized dependency
 */
const normalizeVersion = dependency => {
  return dependency?.replace(/[\^|>|<|=]/g, '')
}

/**
 * @param {string} packageName - Name of the package
 * @returns {boolean} - Is the package a cozy package
 */
const isCozyPackage = packageName => {
  return packageName.match(/cozy-/)
}

/**
 * @param {string} depName - Name of the dependency
 * @param {string} depVersion - Version of the dependency
 * @returns {string} - Normalized dependency
 */
const normalizeDepVersionForApp = (depName, depVersion) => {
  const depVersionWithoutSymbol = normalizeVersion(depVersion)
  if (isCozyPackage(depName)) return `^${depVersionWithoutSymbol}`
  return depVersionWithoutSymbol
}

/**
 * @param {PackageToUpdate[]} packagesToUpdate - Packages to update
 * @returns {string} - Command to update packages
 */
const makeUpdatePackagesCommand = packagesToUpdate => {
  const packageWithVersion = packagesToUpdate.map(pck => {
    const { name, requiredDepVersion } = pck
    const requiredDepVersionNormalized = normalizeVersion(requiredDepVersion)
    return `${name}@${normalizeDepVersionForApp(
      name,
      requiredDepVersionNormalized
    )}`
  })
  console.info(`Upgrade packages ${packageWithVersion.join(', ')}.`)

  return `yarn upgrade ${packageWithVersion.join(' ')}`
}

/**
 * @param {string} libName - Name of the lib
 * @returns {Promise<{ version: string, peerDependencies: { [packageName: string]: string } }>} - Version and peer dependencies of the lib (Among other things present in a "package.json" file)
 */
const getLibPackageJSON = async libName => {
  console.info(`Get ${libName} info...`)
  const { stdout, stderr } = await execPromise(`yarn info ${libName} --json`)

  if (stderr) {
    console.error(`Get ${libName} info failed`)
    return stderr
  }
  return JSON.parse(stdout).data || {}
}

/**
 * @returns {Promise<{ [packageName: string]: string }>} - Dependencies of the app
 */
const getAppDependencies = async () => {
  console.info('Get dependencies of the "Mes papiers" app...')
  const packageContent = await getFileContent('package.json')
  return JSON.parse(packageContent).dependencies
}

/**
 * Get all the packages that need to be updated on the app
 * (cozy-mypapers-lib included)
 * @param {{ [packageName: string]: string }} libPeerDeps - Peer dependencies of the lib
 * @param {{ [packageName: string]: string }} appDeps - Dependencies of the app
 * @returns {PackageToUpdate[]} - Packages to update
 */
const getPackagesToUpdate = ({ libPeerDeps, libName, libVersion, appDeps }) => {
  console.info('Get package to update...')
  const requiredDeps = { ...libPeerDeps, [libName]: libVersion }
  const packageToUpdate = Object.entries(requiredDeps)
    .map(([requiredDepName, requiredDepVersion]) => {
      const appDepVersion = appDeps[requiredDepName]
      const needUpdate = appDepVersion
        ? !satisfies(appDepVersion, requiredDepVersion)
        : true

      if (needUpdate) {
        console.info(
          `Package "${requiredDepName}" need to be updated (old: ${appDepVersion}, new: ${normalizeDepVersionForApp(
            requiredDepName,
            requiredDepVersion
          )})`
        )
        return {
          name: requiredDepName,
          appDepVersion,
          requiredDepVersion,
          needUpdate
        }
      }
      return null
    })
    .filter(Boolean)

  return packageToUpdate
}

/**
 * @param {PackageToUpdate[]} packagesToUpdate - Packages to update
 * @returns {Promise<{ stdout: string, stderr: string }>}
 */
const updatePackages = async packagesToUpdate => {
  const updatePackagesCommand = makeUpdatePackagesCommand(packagesToUpdate)
  return execPromise(updatePackagesCommand)
}

/**
 * @param {object} options
 * @param {string} options.name - name of the package
 * @param {string} options.appDepVersion - version of the package in the app
 * @param {string} options.requiredDepVersion - version of the package required by the lib
 * @returns {string} description of the package to update
 */
const describeUpdatedPackages = ({
  name,
  appDepVersion,
  requiredDepVersion
}) => {
  return `* Update ${name} from ${appDepVersion} to ${normalizeDepVersionForApp(
    name,
    requiredDepVersion
  )}\n`
}

/**
 * @param {PackageToUpdate[]} packagesToUpdate - packages to update
 * @returns {Promise<void>}
 */
const createPRDescription = packagesToUpdate => {
  const PRDescription = [
    '```\n### ✨ Features\n\n',
    ...packagesToUpdate.map(pck => {
      const { name, appDepVersion, requiredDepVersion } = pck
      return describeUpdatedPackages({
        name,
        appDepVersion,
        requiredDepVersion
      })
    }),
    '```'
  ].join('')

  return writeFile(resolve(__dirname, '..', prBodyFilename), PRDescription)
}

/**
 * @param {PackageToUpdate[]} packages - Packages to update
 * @returns {PackageToUpdate[]} - Packages to update without duplicates
 * (If a package is required by the lib with different versions, we keep the highest one)
 */
const cleanPackagesToUpdate = packages => {
  return Object.values(
    packages.reduce((acc, dep) => {
      if (acc[dep.name]) {
        if (
          normalizeVersion(acc[dep.name].requiredDepVersion) <
          normalizeVersion(dep.requiredDepVersion)
        ) {
          acc[dep.name] = dep
        }
      } else {
        acc[dep.name] = dep
      }
      return acc
    }, {})
  )
}

module.exports = {
  isCozyPackage,
  normalizeVersion,
  normalizeDepVersionForApp,
  makeUpdatePackagesCommand,

  getLibPackageJSON,
  getAppDependencies,
  getPackagesToUpdate,
  updatePackages,
  createPRDescription,
  cleanPackagesToUpdate
}
