import {
  extractFilesToMigrate,
  getMostRecentUpdatedDate,
  makeNewMetadata,
  migrateFileMetadata
} from 'src/helpers/migration/metadata'

describe('migration metadata', () => {
  describe('getMostRecentUpdatedDate', () => {
    it('should find the most recent date in a list of files', () => {
      let files = []
      expect(getMostRecentUpdatedDate(files)).toBeNull()

      files = [
        {
          attributes: {
            cozyMetadata: {
              updatedAt: '2023-01-01'
            }
          }
        }
      ]
      expect(getMostRecentUpdatedDate(files)).toEqual('2023-01-01')

      files = [
        {
          attributes: {
            cozyMetadata: {
              updatedAt: '2023-01-02'
            }
          }
        },
        {
          attributes: {
            cozyMetadata: {
              updatedAt: '2023-01-01'
            }
          }
        }
      ]
      expect(getMostRecentUpdatedDate(files)).toEqual('2023-01-02')
    })
  })
  describe('makeNewMetadata', () => {
    it('should return new metadata object with remplaced old property', () => {
      const oldMetadata = {
        datetime: '2023-03-17T12:39:28.000Z',
        datetimeLabel: 'datetime',
        ibanNumber: 'aaaa77777777777777777777777',
        qualification: {
          label: 'bank_details',
          purpose: 'attestation',
          sourceCategory: 'bank',
          subjects: ['bank_account']
        }
      }
      const expected = {
        datetime: '2023-03-17T12:39:28.000Z',
        datetimeLabel: 'datetime',
        number: 'aaaa77777777777777777777777',
        qualification: {
          label: 'bank_details',
          purpose: 'attestation',
          sourceCategory: 'bank',
          subjects: ['bank_account']
        }
      }

      const res = makeNewMetadata(oldMetadata)

      expect(res).toEqual(expected)
    })
  })
  describe('migrateFileMetadata', () => {
    const oldFiles = [
      {
        _id: '00',
        name: 'fileName cafFileNumber',
        metadata: {
          cafFileNumber: 'cafFileNumberValue',
          qualification: { label: 'caf' }
        }
      }
    ]
    const client = {
      collection: jest.fn(() => ({
        updateMetadataAttribute: jest.fn().mockResolvedValue({
          data: {
            _id: '00',
            attributes: {
              metadata: {
                number: 'cafFileNumberValue',
                qualification: { label: 'caf' }
              },
              name: 'fileName cafFileNumber'
            }
          }
        })
      }))
    }
    it('should return array of file migrated', async () => {
      const res = await migrateFileMetadata(client, oldFiles)

      const expected = [
        {
          _id: '00',
          attributes: {
            metadata: {
              number: 'cafFileNumberValue',
              qualification: { label: 'caf' }
            },
            name: 'fileName cafFileNumber'
          }
        }
      ]

      expect(res).toEqual(expected)
    })
  })
  describe('extractFilesToMigrate', () => {
    it('should return only the files with old metadata ', () => {
      const files = [
        {
          _id: '00',
          metadata: {
            number: 'cafFileNumberValue',
            qualification: { label: 'caf' }
          }
        },
        {
          _id: '01',
          metadata: {
            passportNumber: 'passportNumberValue',
            qualification: { label: 'passport' }
          }
        }
      ]
      const expected = [
        {
          _id: '01',
          metadata: {
            passportNumber: 'passportNumberValue',
            qualification: { label: 'passport' }
          }
        }
      ]
      const res = extractFilesToMigrate(files)

      expect(res).toEqual(expected)
    })
  })
})
