import People from 'cozy-ui/transpiled/react/Icons/People'

const identityLabels = ['national_id_card', 'passport']

export const getIconByLabel = label => {
  if (identityLabels.includes(label)) return People
}
