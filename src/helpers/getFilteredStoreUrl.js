import { FILES_DOCTYPE } from 'src/constants'

import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker'

export const getFilteredStoreUrl = client =>
  generateUniversalLink({
    cozyUrl: client.getStackClient().uri,
    slug: 'store',
    subDomainType: client.getInstanceOptions().subdomain,
    nativePath: `discover/?type=konnector&doctype=${FILES_DOCTYPE}`
  })
