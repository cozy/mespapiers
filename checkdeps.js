const exec = require("child_process").exec;
const fs = require("fs").promises
const compareVersions = require("compare-versions")


// TEMP
function pad(text, length, options = {}){
  const invert = typeof text === 'number'
  if(invert){
    [length, text] = [text, length]
  }
  if(typeof options === 'string'){
    options = {char: options}
  }
  if(!options.char){
    options.char = ' '
  }
  if(!options.strip){
    options.strip = false
  }
  if(!typeof text === 'string'){
    text = text.toString()
  }
  let textnocolors = null
  let pad = ''
  if(options.colors){
    escapecolor = /\x1B\[(?:[0-9]{1,2}(?:;[0-9]{1,2})?)?[m|K]/g
    textnocolors = text.replace(escapecolor, '')
  }
  // padlength = options.fixed_width === true
  // ? length - (textnocolors || text).length
  // : length - wcwidth.config(options.wcwidth_options)(textnocolors || text)
  padlength = length - (textnocolors || text).length
  if(padlength < 0){
    if(options.strip){
      return invert
      ? text.substr(length * -1)
      : text.substr(0, length)
    }
    return text
  }
  pad += options.char.repeat(padlength)
  return invert
  ? pad + text
  : text + pad
}

const logCompareResult = (packageName, currentVersion, expectedVersion, compareResult) => {
  const packageNameStr = pad(packageName, 20)
  const currentVersionStr = pad(currentVersion, 7)
  const expectedVersionStr = pad(expectedVersion, 7)

  let sign
  let instruction = 'no update needed'
  if (compareResult > 0) sign = '>'
  if (compareResult === 0) sign = '='

  if (compareResult < 0) {
    sign = '<'
    instruction = 'NEED UPDATE'
  }

  console.log(`${packageNameStr}: ${currentVersionStr} ${sign} ${expectedVersionStr} => ${instruction}`)
}

// TEMP

const execute = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) {
      resolve(stdout);
    });
  });
}

const getPeerDependencies = async (packageName) => {
  const result = await execute(`yarn info ${packageName} peerDependencies --json`)

  const dependencies = JSON.parse(result)

  return dependencies.data
}

const getVersions = async (packageName) => {
  const result = await execute(`yarn info ${packageName} versions --json`)

  const dependencies = JSON.parse(result)

  return dependencies.data
}

const getPackageJson = async () => {
  const packageContent = await fs.readFile('./package.json', { encoding: 'utf8' })

  const packageJson = JSON.parse(packageContent)

  return packageJson
}

const getPackageJsonDependencies = async () => {
  const { dependencies } = await getPackageJson()

  return dependencies
}

const normalizeVersion = (version) => {
  return version
  .replace(">", "")
  .replace("=", "")
  .replace("^", "")
}

const getPackagesToUpdate = (peerDependencies, currentPackages) => {
  return Object.entries(peerDependencies)
    .map(([key, value]) => {
      const expectedVersion = normalizeVersion(value)

      const currentVersion = normalizeVersion(currentPackages[key])

      const compare = compareVersions(currentVersion, expectedVersion)
      
      logCompareResult(key, currentVersion, expectedVersion, compare)
      
      const needUpdate = compare < 0

      return {
        name: key,
        currentVersion,
        expectedVersion,
        needUpdate
      }
    })
    .filter(package => package.needUpdate)
}

const updatePackages = (packagesToUpdate) => {
  packagesToUpdate.forEach(package => {
    const { name, expectedVersion } = package
    const command = `yarn upgrade ${name}@${expectedVersion}`

    console.log(command)
  });
}

const main = async () => {
  const peerDependencies = await getPeerDependencies("cozy-mespapiers-lib")
  console.log({peerDependencies})

  const currentPackages = await getPackageJsonDependencies()

  console.log({currentPackages})

  const packagesToUpdate = getPackagesToUpdate(peerDependencies, currentPackages)

  console.log('')
  await updatePackages(packagesToUpdate)

  for (let package of packagesToUpdate) {
    const versions = await getVersions(package.name)

    const higherVersions = versions.filter(version => compareVersions(package.currentVersion, version) < 0 && compareVersions(package.expectedVersion, version) >= 0)

    console.log(`${package.name} : ${package.currentVersion} -> ${package.expectedVersion}`)
    console.log({higherVersions})

    //https://www.npmjs.com/package/semver
  }
}

main()

/*

Récupérer une release
https://api.github.com/repos/cozy/cozy-ui/releases/tags/v73.0.0
  Chercher ### BREAKING CHANGES
  Si contient BREAKING CHANGES alors warning
  (faire ça pour toutes les versions majeurs)
 */