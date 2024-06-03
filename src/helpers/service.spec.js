import MockDate from 'mockdate'
import { getfilesNeedNotified } from 'src/helpers/service'

describe('Service', () => {
  beforeEach(() => {
    MockDate.set('2022-11-01T11:35:58.118Z')
  })
  afterEach(() => {
    MockDate.reset()
  })

  const fakeFile01 = {
    _id: '01',
    name: 'national id card',
    created_at: '2022-09-01T00:00:00.000Z',
    metadata: {
      qualification: { label: 'national_id_card' },
      expirationDate: '2022-09-23T11:35:58.118Z',
      noticePeriod: '90'
    }
  }
  const fakeFile02 = {
    _id: '02',
    name: 'personal sporting licence',
    created_at: '2022-09-01T00:00:00.000Z',
    metadata: {
      qualification: { label: 'personal_sporting_licence' },
      referencedDate: '2021-09-23T11:35:58.118Z'
    }
  }
  const fakeFile03 = {
    _id: '03',
    name: 'unknown',
    created_at: '2022-09-01T00:00:00.000Z'
  }

  describe('getfilesNeedNotified', () => {
    it('should return only files that need to be notified', () => {
      const res = getfilesNeedNotified([fakeFile01, fakeFile02, fakeFile03])

      expect(res).toEqual([
        {
          expirationDate: '2022-09-23T11:35:58.118Z',
          file: {
            _id: '01',
            created_at: '2022-09-01T00:00:00.000Z',
            metadata: {
              qualification: { label: 'national_id_card' },
              expirationDate: '2022-09-23T11:35:58.118Z',
              noticePeriod: '90'
            },
            name: 'national id card'
          }
        },
        {
          expirationDate: '2022-09-23T11:35:58.118Z',
          file: {
            _id: '02',
            name: 'personal sporting licence',
            created_at: '2022-09-01T00:00:00.000Z',
            metadata: {
              qualification: { label: 'personal_sporting_licence' },
              referencedDate: '2021-09-23T11:35:58.118Z'
            }
          }
        }
      ])
    })
  })
})
