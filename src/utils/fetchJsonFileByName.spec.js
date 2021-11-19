import { fetchJsonFileByName } from 'src/utils/fetchJsonFileByName'

describe('fetchJsonFileByName', () => {
  const mockClient = name => {
    const client = {
      query: jest.fn(() => ({
        data: [{ _id: '01', name, trashed: false }]
      })),
      collection: jest.fn(() => ({
        fetchFileContentById: jest.fn(() => ({
          json:
            name === 'file01'
              ? jest.fn().mockReturnValue(`{ "key01": "value01" }`)
              : jest.fn().mockReturnValue(`{ "key02": "value02" }`)
        }))
      }))
    }
    return client
  }

  it('should return content of JSON file01', async () => {
    const client = mockClient('file01')
    const res = await fetchJsonFileByName(client, 'file01')

    expect(res).toEqual(`{ "key01": "value01" }`)
  })
  it('should return content of JSON file02', async () => {
    const client = mockClient('file02')
    const res = await fetchJsonFileByName(client, 'file02')

    expect(res).toEqual(`{ "key02": "value02" }`)
  })
})
