import { buildFilename } from 'src/helpers/buildFilename'

describe('buildFilename', () => {
  it('should replace "/" by "_" in qualificationName', () => {
    const paperName = buildFilename({
      qualificationName: 'passport/test'
    })

    expect(paperName).toEqual('passport_test.pdf')
  })

  it.each`
    opts                                                                                                 | result
    ${{ qualificationName: 'passport' }}                                                                 | ${'passport.pdf'}
    ${{ qualificationName: 'passport', pageName: 'front' }}                                              | ${'passport - front.pdf'}
    ${{ qualificationName: 'passport', fullname: 'Bob' }}                                                | ${'passport - Bob.pdf'}
    ${{ qualificationName: 'passport', formatedDate: '2022.01.01' }}                                     | ${'passport - 2022.01.01.pdf'}
    ${{ qualificationName: 'passport', pageName: 'front', fullname: 'Bob' }}                             | ${'passport - front - Bob.pdf'}
    ${{ qualificationName: 'passport', pageName: 'front', formatedDate: '2022.01.01' }}                  | ${'passport - front - 2022.01.01.pdf'}
    ${{ qualificationName: 'passport', fullname: 'Bob', formatedDate: '2022.01.01' }}                    | ${'passport - Bob - 2022.01.01.pdf'}
    ${{ qualificationName: 'passport', pageName: 'front', fullname: 'Bob', formatedDate: '2022.01.01' }} | ${'passport - front - Bob - 2022.01.01.pdf'}
  `(
    `should return correct Paper name when passed arguments are: $opts`,
    ({ opts, result }) => {
      expect(buildFilename(opts)).toEqual(result)
    }
  )
})
