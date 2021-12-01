import { buildPaperslistByContact } from 'src/helpers/buildPaperslistByContact'

const mockContactsList = [
  { _id: 'contactId01', fullname: 'Bob' },
  { _id: 'contactId02', fullname: 'Alice' }
]
const mockPapersList = [
  {
    _id: 'fileId01',
    name: 'file01.pdf',
    relationships: {
      referenced_by: { data: [{ id: 'contactId01', type: 'io.cozy.contacts' }] }
    }
  },
  {
    _id: 'fileId02',
    name: 'file02.pdf',
    relationships: {
      referenced_by: { data: [{ id: 'contactId02', type: 'io.cozy.contacts' }] }
    }
  },
  {
    _id: 'fileId03',
    name: 'file03.pdf',
    relationships: {
      referenced_by: { data: [{ id: 'contactId01', type: 'io.cozy.contacts' }] }
    }
  }
]

describe('buildPaperslistByContact', () => {
  it('should return object with all papers filtered by contacts', () => {
    const expected = [
      {
        contact: 'Alice',
        papers: [
          {
            _id: 'fileId02',
            name: 'file02.pdf',
            relationships: {
              referenced_by: {
                data: [{ id: 'contactId02', type: 'io.cozy.contacts' }]
              }
            }
          }
        ]
      },
      {
        contact: 'Bob',
        papers: [
          {
            _id: 'fileId01',
            name: 'file01.pdf',
            relationships: {
              referenced_by: {
                data: [{ id: 'contactId01', type: 'io.cozy.contacts' }]
              }
            }
          },
          {
            _id: 'fileId03',
            name: 'file03.pdf',
            relationships: {
              referenced_by: {
                data: [{ id: 'contactId01', type: 'io.cozy.contacts' }]
              }
            }
          }
        ]
      }
    ]

    const result = buildPaperslistByContact(mockPapersList, mockContactsList)

    expect(result).toEqual(expected)
  })
})