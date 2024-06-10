import format from 'date-fns/format'
import template from 'raw-loader!./template.hbs'
import { APP_SLUG } from 'src/constants'

import { generateWebLink } from 'cozy-client'
import { splitFilename } from 'cozy-client/dist/models/file'
import { NotificationView } from 'cozy-notifications'

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
  #hasMultipleExpiredFiles

  constructor(options) {
    super(options)
    this.currentDate = options.currentDate
    this.filesInfo = options.filesInfo
    this.#hasMultipleExpiredFiles = options.filesInfo.length > 1
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
    if (!this.#hasMultipleExpiredFiles) {
      const file = this.filesInfo[0].file

      if (file) {
        const { filename } = splitFilename(file)
        return this.t('notifications.expiration.mobile.content.info', {
          filename
        })
      }
    }

    return this.t('notifications.expiration.mobile.content.multiple')
  }
  /**
   * Subject of mail
   * @returns {string}
   */
  getTitle() {
    return this.t('notifications.expiration.email.title')
  }

  getExtraAttributes() {
    let paperLink = 'paper'

    if (!this.#hasMultipleExpiredFiles) {
      const file = this.filesInfo[0].file
      if (file) {
        paperLink = `paper/files/${file.metadata.qualification.label}/${file._id}`
      }
    }

    return {
      data: {
        appName: '', // Overwrite the appName in the notification
        redirectLink: `mespapiers/#/${paperLink}`
      }
    }
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
        const { filename } = splitFilename(file)
        const paperLink = generateWebLink({
          slug: APP_SLUG,
          cozyUrl: this.client.getStackClient().uri,
          subDomainType: this.client.getInstanceOptions().subdomain,
          pathname: '/',
          hash: `files/${file.metadata.qualification.label}/${file._id}`
        })

        return {
          name: filename,
          paperLink,
          expirationDate
        }
      }),
      homeUrl: this.client.getStackClient().uri,
      mespapiersUrl: generateWebLink({
        slug: APP_SLUG,
        cozyUrl: this.client.getStackClient().uri,
        subDomainType: this.client.getInstanceOptions().subdomain,
        pathname: '/',
        hash: ''
      }),
      settingsUrl: generateWebLink({
        slug: 'settings',
        cozyUrl: this.client.getStackClient().uri,
        subDomainType: this.client.getInstanceOptions().subdomain,
        pathname: '/'
      })
    }
  }
}

ExpirationNotification.template = template
ExpirationNotification.category = 'expiration'
ExpirationNotification.preferredChannels = ['mobile', 'mail']

export default ExpirationNotification
