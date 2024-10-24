import { FILES_DOCTYPE } from 'src/constants'
import {
  addCountryValueByQualification,
  createPdfAndSave,
  updateMetadata
} from 'src/helpers/createPdfAndSave'

jest.mock('cozy-client/dist/models/file', () => ({
  ...jest.requireActual('cozy-client/dist/models/file'),
  uploadFileWithConflictStrategy: jest.fn(() => ({
    data: { _id: '1234' }
  }))
}))

jest.mock('cozy-ui/transpiled/react/ActionsMenu/Actions/helpers', () => ({
  ...jest.requireActual('cozy-ui/transpiled/react/ActionsMenu/Actions/helpers'),
  addFileToPdf: jest.fn().mockReturnValue('')
}))

jest.mock('./buildFilename', () => ({
  buildFilename: jest.fn().mockReturnValue('')
}))

const mockParams = file => ({
  formData: {
    data: [
      {
        file,
        fileMetadata: {}
      }
    ],
    metadata: { [FILES_DOCTYPE]: {} },
    contacts: []
  },
  qualification: {},
  currentDefinition: {
    featureDate: '',
    label: `qualificationLabelTest-${file.type}`
  },
  appFolderID: '',
  client: {
    collection: jest.fn(() => ({
      addReferencedBy: jest.fn()
    }))
  },
  i18n: {
    t: jest.fn(),
    f: jest.fn(),
    scannerT: jest.fn()
  }
})

describe('createAndSavePdf', () => {
  it('should return array with fileId & theme label', async () => {
    const expectedPDF = [
      {
        fileId: '1234',
        qualificationLabel: 'qualificationLabelTest-application/pdf'
      }
    ]
    const expectedJPG = [
      { fileId: '1234', qualificationLabel: 'qualificationLabelTest-image/jpg' }
    ]

    const filePDF = new File(['bob'], 'bob.pdf', {
      type: 'application/pdf'
    })
    const fileJPG = new File(['bob'], 'bob.jpg', {
      type: 'image/jpg'
    })

    const resultPDF = await createPdfAndSave(mockParams(filePDF))
    const resultJPG = await createPdfAndSave(mockParams(fileJPG))

    expect(resultPDF).toEqual(expectedPDF)
    expect(resultJPG).toEqual(expectedJPG)
  })
})

describe('addCountryValueByQualification', () => {
  it('should return object with country key', () => {
    const qualification = { label: 'national_id_card' }
    const result = addCountryValueByQualification(qualification)
    expect(result).toEqual({ country: 'FR' })
  })

  it('should return empty object', () => {
    const qualification = { label: 'other_revenue' }
    const result = addCountryValueByQualification(qualification)
    expect(result).toEqual({})
  })
})

describe('updateMetadata', () => {
  it('should works without metadata', () => {
    const result = updateMetadata({
      metadata: {},
      qualification: { label: 'birth_certificate' },
      datetime: 'mockDate'
    })

    expect(result).toEqual({
      [FILES_DOCTYPE]: {
        qualification: { label: 'birth_certificate' },
        datetime: 'mockDate',
        datetimeLabel: 'datetime'
      }
    })
  })
  it('should return metadata with other keys', () => {
    const result = updateMetadata({
      metadata: { [FILES_DOCTYPE]: { name: 'name' } },
      qualification: { label: 'national_id_card' },
      featureDate: 'referencedDate',
      datetime: 'mockDate'
    })

    expect(result).toEqual({
      [FILES_DOCTYPE]: {
        name: 'name',
        qualification: { label: 'national_id_card' },
        datetime: 'mockDate',
        datetimeLabel: 'referencedDate',
        country: 'FR'
      }
    })
  })
})
