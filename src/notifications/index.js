import format from 'date-fns/format'

import { generateWebLink } from 'cozy-client'
import { NotificationView } from 'cozy-notifications'

import template from 'raw-loader!./template.hbs'

/**
 * @typedef {object} FilesInfo
 * @property {string} name - Filename
 * @property {string} paperLink - Link leading to the file
 * @property {string} expirationDate - Expiration date of the document
 */

/**
 * @typedef {object} BuildDataReturns
 * @property {string} date - Current date formatted
 * @property {FilesInfo} filesInfo
 * @property {string} homeUrl - Cozy Home url
 * @property {string} mespapiersUrl - Cozy mesPapiers url
 * @property {string} settingsUrl - Cozy settings url
 */

/**
 * Manages the notification sent for expiration files
 */
class ExpirationNotification extends NotificationView {
  constructor(options) {
    super(options)
    this.currentDate = options.currentDate
    this.filesInfo = options.filesInfo
  }

  /**
   * Required by cozy-notifications
   * The current version of cozy-notifications does not allow to omit these methods
   * @returns {boolean}
   */
  shouldSend() {
    return true
  }
  /**
   * Required by cozy-notifications
   * The current version of cozy-notifications does not allow to omit these methods
   * @returns {string}
   */
  getPushContent() {
    return ' '
  }
  /**
   * Required by cozy-notifications
   * The current version of cozy-notifications does not allow to omit these methods
   * @returns {string}
   */
  getTitle() {
    return ' '
  }

  /**
   * Building data passed to the template
   * @returns {BuildDataReturns}
   */
  async buildData() {
    return {
      date: format(new Date(), 'dd/MM/yyyy'),
      filesInfo: this.filesInfo.map(fileInfo => {
        const { file, expirationDate } = fileInfo
        const paperLink = generateWebLink({
          slug: 'mespapiers',
          cozyUrl: this.client.getStackClient().uri,
          subDomainType: 'nested',
          pathname: '/',
          hash: `paper/file/${file.metadata.qualification.label}/${file._id}`
        })

        return {
          name: file.name,
          paperLink,
          expirationDate
        }
      }),
      homeUrl: this.client.getStackClient().uri,
      mespapiersUrl: generateWebLink({
        slug: 'mespapiers',
        cozyUrl: this.client.getStackClient().uri,
        subDomainType: 'nested',
        pathname: '/',
        hash: 'paper'
      }),
      settingsUrl: generateWebLink({
        slug: 'settings',
        cozyUrl: this.client.getStackClient().uri,
        subDomainType: 'nested',
        pathname: '/'
      })
    }
  }
}

ExpirationNotification.template = template
ExpirationNotification.category = 'expiration'
ExpirationNotification.preferredChannels = ['mail']

export default ExpirationNotification
