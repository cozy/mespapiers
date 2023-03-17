export const CONTACTS_DOCTYPE = 'io.cozy.contacts'
export const FILES_DOCTYPE = 'io.cozy.files'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
export const APP_SETTINGS_DOCTYPE = 'io.cozy.mespapiers.settings'
export const JOBS_DOCTYPE = 'io.cozy.jobs'

export const APP_SLUG = 'mespapiers'
export const EXPIRATION_SERVICE_NAME = 'expiration'
export const lang = process.env.COZY_LOCALE || 'fr'
export const dictRequire = lang => require(`locales/${lang}`)
