import { buildFilename } from 'src/helpers/buildFilename'

const mockOneContact = [
  { _id: 'contactId01', name: { givenName: 'Bernard', familyName: 'Chabert' } }
]

describe('buildFilename', () => {
  it('should replace "/" by "_" in qualificationName', () => {
    const paperName = buildFilename({
      contacts: [],
      qualification: { name: 'passport/test' }
    })

    expect(paperName).toEqual('passport_test.pdf')
  })

  it.each`
    opts | result
    ${{
  qualification: { name: 'passport' },
  formatedDate: '2022.01.01',
  contacts: mockOneContact,
  filenameModel: ['labelGivenByUser', 'contactName', 'featureDate'],
  metadata: { 'io.cozy.files': { labelGivenByUser: 'Mon fichier' } }
}} | ${'Mon fichier - Bernard Chabert - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'featureDate'],
  metadata: { 'io.cozy.files': { labelGivenByUser: 'Mon fichier' } }
}} | ${'Mon fichier - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'featureDate'],
  metadata: { 'io.cozy.files': { labelGivenByUser: '' } }
}} | ${'2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'featureDate']
}} | ${'2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'featureDate'],
  metadata: {}
}} | ${'2022.01.01.pdf'}
    ${{
  qualification: { name: 'fidelity_card' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'page'],
  metadata: { 'io.cozy.files': { labelGivenByUser: 'Mon fichier' } }
}} | ${'Mon fichier.pdf'}
    ${{
  qualification: { name: 'fidelity_card' },
  formatedDate: '2022.01.01',
  contacts: [],
  filenameModel: ['labelGivenByUser', 'page'],
  metadata: { 'io.cozy.files': { labelGivenByUser: 'Mon fichier' } }
}} | ${'Mon fichier.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: []
}} | ${'passport.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: []
}} | ${'passport.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: mockOneContact
}} | ${'passport - Bernard Chabert.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: [],
  formatedDate: '2022.01.01'
}} | ${'passport - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: mockOneContact
}} | ${'passport - Bernard Chabert.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: [],
  formatedDate: '2022.01.01'
}} | ${'passport - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: mockOneContact,
  formatedDate: '2022.01.01'
}} | ${'passport - Bernard Chabert - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport', label: 'vehicle_registration' },
  metadata: { 'io.cozy.files': { vehicle: { licenseNumber: '123456' } } },
  contacts: mockOneContact,
  formatedDate: '2022.01.01'
}} | ${'passport - 123456 - Bernard Chabert - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport', label: 'vehicle_registration' },
  contacts: mockOneContact,
  formatedDate: '2022.01.01'
}} | ${'passport - Bernard Chabert - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  metadata: { 'io.cozy.files': { vehicle: { licenseNumber: '123456' } } },
  contacts: mockOneContact,
  formatedDate: '2022.01.01'
}} | ${'passport - Bernard Chabert - 2022.01.01.pdf'}
    ${{
  qualification: { name: 'passport' },
  contacts: mockOneContact,
  formatedDate: '2022.01.01'
}} | ${'passport - Bernard Chabert - 2022.01.01.pdf'}
  `(`should return $result with "$opts" parameters`, ({ opts, result }) => {
    expect(buildFilename(opts)).toEqual(result)
  })
})
