export const CONTACTS_DOCTYPE = 'io.cozy.contacts'
export const FILES_DOCTYPE = 'io.cozy.files'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

export const APP_SLUG = 'mespapiers'
export const EXPIRATION_SERVICE_NAME = 'expiration'
export const DEFAULT_NOTICE_PERIOD_DAYS = 90
export const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15
export const lang = process.env.COZY_LOCALE || 'fr'
export const dictRequire = lang => require(`locales/${lang}`)
