import People from 'cozy-ui/transpiled/react/Icons/People'

import { getIconByLabel } from 'src/utils/getIconByLabel'

describe('getIconByLabel', () => {
  it('should return correct Icon if label is found', () => {
    const result = getIconByLabel('national_id_card')

    expect(result).toBe(People)
  })

  it('should return nothing if label is not found', () => {
    const result = getIconByLabel('fake_label')

    expect(result).toBe(undefined)
  })
})
