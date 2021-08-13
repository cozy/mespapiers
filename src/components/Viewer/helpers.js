import has from 'lodash/has'

export const hasQualifications = ({ file }) => {
  return has(file, 'metadata.qualification')
}

export const hasCertifications = ({ file }) => {
  return (
    has(file, 'metadata.carbonCopy') || has(file, 'metadata.electronicSafe')
  )
}

export const isFromKonnector = ({ file }) => {
  return has(file, 'cozyMetadata.sourceAccount')
}

export const showPanel = ({ file }) => {
  return (
    hasCertifications({ file }) ||
    hasQualifications({ file }) ||
    isFromKonnector({ file })
  )
}
