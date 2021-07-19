export const fakeData = [
  {
    label: 'national_id_card',
    icon: 'people',
    featuredPlaceholder: true,
    rankPlaceholder: 1,
    pages: [
      {
        pageNumber: 1,
        illustration: 'illu_id_card_recto.svg',
        text: 'PaperJSON.IDCard.page01.text'
      },
      {
        pageNumber: 2,
        illustration: 'illu_id_card_verso.svg',
        text: 'PaperJSON.IDCard.page02.text'
      },
      {
        pageNumber: 3,
        illustration: 'illu_id_card_number.svg',
        text: 'PaperJSON.IDCard.page03.text',
        attributes: [
          {
            name: 'number',
            type: 'french_id_card_number'
          }
        ]
      },
      {
        pageNumber: 4,
        illustration: 'illu_id_card_peremptionDate.svg',
        text: 'PaperJSON.IDCard.page04.text',
        attributes: [
          {
            name: 'peremptionDate',
            type: 'date'
          }
        ]
      }
    ],
    featureDate: 'peremptionDate',
    maxDisplay: 2
  },
  {
    label: 'passport',
    icon: 'people',
    featuredPlaceholder: false,
    rankPlaceholder: 2,
    pages: [
      {
        pageNumber: 1,
        illustration: 'illu_passport_recto.svg',
        text: 'PaperJSON.Passport.page01.text'
      },
      {
        pageNumber: 2,
        illustration: 'illu_passport_verso.svg',
        text: 'PaperJSON.Passport.page02.text'
      },
      {
        pageNumber: 3,
        illustration: 'illu_passport_number.svg',
        text: 'PaperJSON.Passport.page03.text',
        attributes: [
          {
            name: 'number',
            type: 'french_passport_number'
          }
        ]
      },
      {
        pageNumber: 4,
        illustration: 'illu_passport_peremptionDate.svg',
        text: 'PaperJSON.Passport.page04.text',
        attributes: [
          {
            name: 'peremptionDate',
            type: 'date'
          }
        ]
      }
    ],
    featureDate: 'peremptionDate',
    maxDisplay: 2
  }
]
