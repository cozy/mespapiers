const {
  normalizeVersion,
  normalizeDepVersionForApp,
  isCozyPackage,
  getPackagesToUpdate,
  makeUpdatePackagesCommand,
  cleanPackagesToUpdate
} = require('./utils')

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  createWriteStream: jest.fn(() => ({ write: jest.fn(), end: jest.fn() }))
}))

const mockLibName = 'cozy-mespapiers-lib'
const mockLibPackage = {
  'cozy-pck01': '>=2.1.3',
  'cozy-pck02': '>2.1.3',
  'cozy-pck03': '<2.1.3',
  'cozy-pck04': '=2.1.3',
  'cozy-pck05': '>=2.1.3',
  pck01: '>=2.1.3',
  pck02: '>2.1.3',
  pck03: '<2.1.3',
  pck04: '=2.1.3',
  pck05: '>=2.1.3'
}
const mockAppPackage = {
  'cozy-mespapiers-lib': '^1.0.0',
  'cozy-pck01': '^2.0.0',
  'cozy-pck02': '^2.0.0',
  'cozy-pck03': '^2.0.0',
  'cozy-pck04': '^2.0.0',
  'cozy-pck06': '^2.0.0',
  pck01: '2.0.0',
  pck02: '2.0.0',
  pck03: '2.0.0',
  pck04: '2.0.0',
  pck06: '2.0.0'
}
const mockPackageToUpdate = [
  {
    name: 'cozy-device-helper',
    appDepVersion: '2.2.1',
    requiredDepVersion: '>=2.6.0',
    needUpdate: true
  },
  {
    name: 'cozy-intent',
    appDepVersion: '^1.17.3',
    requiredDepVersion: '>=2.2.0',
    needUpdate: true
  },
  {
    name: 'cozy-device-helper',
    appDepVersion: '2.2.1',
    requiredDepVersion: '>=3.0.0',
    needUpdate: true
  },
  {
    name: 'react-router',
    appDepVersion: undefined,
    requiredDepVersion: '3.2.6',
    needUpdate: true
  }
]

describe('utils', () => {
  describe('normalizeVersion', () => {
    it('should return string without specific characters (^|<|>|=)', () => {
      expect(normalizeVersion('^1.0.0')).toBe('1.0.0')
      expect(normalizeVersion('>1.0.0')).toBe('1.0.0')
      expect(normalizeVersion('<1.0.0')).toBe('1.0.0')
      expect(normalizeVersion('>=1.0.0')).toBe('1.0.0')
      expect(normalizeVersion('<=1.0.0')).toBe('1.0.0')
    })
  })
  describe('normalizeDepVersionForApp', () => {
    it('should return the version prefixed with a `^`, if it is a Cozy package', () => {
      expect(normalizeDepVersionForApp('cozy-ui', '1.0.0')).toBe('^1.0.0')
      expect(normalizeDepVersionForApp('cozy-ui', '>1.0.0')).toBe('^1.0.0')
      expect(normalizeDepVersionForApp('cozy-ui', '<1.0.0')).toBe('^1.0.0')
      expect(normalizeDepVersionForApp('cozy-ui', '>=1.0.0')).toBe('^1.0.0')
      expect(normalizeDepVersionForApp('cozy-ui', '<=1.0.0')).toBe('^1.0.0')
    })
    it('should return version without specific characters (^|<|>|=), if not a Cozy package', () => {
      expect(normalizeDepVersionForApp('react-router', '1.0.0')).toBe('1.0.0')
      expect(normalizeDepVersionForApp('react-router', '>1.0.0')).toBe('1.0.0')
      expect(normalizeDepVersionForApp('react-router', '<1.0.0')).toBe('1.0.0')
      expect(normalizeDepVersionForApp('react-router', '>=1.0.0')).toBe('1.0.0')
      expect(normalizeDepVersionForApp('react-router', '<=1.0.0')).toBe('1.0.0')
    })
  })
  describe('isCozyPackage', () => {
    it('should return False if package is not prefix by "cozy-"', () => {
      expect(isCozyPackage('react-router-dom')).toBeFalsy()
      expect(isCozyPackage('react')).toBeFalsy()
      expect(isCozyPackage('lodash')).toBeFalsy()
    })
    it('should return True if package is prefix by "cozy-"', () => {
      expect(isCozyPackage('cozy-client')).toBeTruthy()
      expect(isCozyPackage('cozy-device-helper')).toBeTruthy()
    })
  })
  describe('getPackagesToUpdate', () => {
    it('should return packages that need to be updated', () => {
      const expected = [
        {
          appDepVersion: '^2.0.0',
          name: 'cozy-pck01',
          needUpdate: true,
          requiredDepVersion: '>=2.1.3'
        },
        {
          appDepVersion: '^2.0.0',
          name: 'cozy-pck02',
          needUpdate: true,
          requiredDepVersion: '>2.1.3'
        },
        {
          appDepVersion: '^2.0.0',
          name: 'cozy-pck04',
          needUpdate: true,
          requiredDepVersion: '=2.1.3'
        },
        {
          appDepVersion: undefined,
          name: 'cozy-pck05',
          needUpdate: true,
          requiredDepVersion: '>=2.1.3'
        },
        {
          appDepVersion: '2.0.0',
          name: 'pck01',
          needUpdate: true,
          requiredDepVersion: '>=2.1.3'
        },
        {
          appDepVersion: '2.0.0',
          name: 'pck02',
          needUpdate: true,
          requiredDepVersion: '>2.1.3'
        },
        {
          appDepVersion: '2.0.0',
          name: 'pck04',
          needUpdate: true,
          requiredDepVersion: '=2.1.3'
        },
        {
          appDepVersion: undefined,
          name: 'pck05',
          needUpdate: true,
          requiredDepVersion: '>=2.1.3'
        },
        {
          appDepVersion: '^1.0.0',
          name: 'cozy-mespapiers-lib',
          needUpdate: true,
          requiredDepVersion: '1.5.0'
        }
      ]

      const res = getPackagesToUpdate({
        libPeerDeps: mockLibPackage,
        libName: mockLibName,
        libVersion: '1.5.0',
        appDeps: mockAppPackage
      })
      expect(res).toStrictEqual(expected)
    })
  })
  describe('makeUpdatePackagesCommand', () => {
    it('should make correct command to execute', () => {
      const mockPackageToUpdate = [
        {
          name: 'cozy-pck01',
          requiredDepVersion: '>=2.1.3',
          appDepVersion: '^2.0.0'
        },
        { name: 'pck01', requiredDepVersion: '>=2.1.3', appDepVersion: '2.0.0' }
      ]
      const res = makeUpdatePackagesCommand(mockPackageToUpdate)

      expect(res).toBe('yarn upgrade cozy-pck01@^2.1.3 pck01@2.1.3')
    })
  })
  describe('cleanPackagesToUpdate', () => {
    it('should keep only the highest version of duplicate packages', () => {
      const res = cleanPackagesToUpdate(mockPackageToUpdate)
      expect(res).toStrictEqual([
        {
          name: 'cozy-device-helper',
          appDepVersion: '2.2.1',
          requiredDepVersion: '>=3.0.0',
          needUpdate: true
        },
        {
          name: 'cozy-intent',
          appDepVersion: '^1.17.3',
          requiredDepVersion: '>=2.2.0',
          needUpdate: true
        },
        {
          name: 'react-router',
          appDepVersion: undefined,
          requiredDepVersion: '3.2.6',
          needUpdate: true
        }
      ])
    })
  })
})
