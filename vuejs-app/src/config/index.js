import devConf from './dev.conf'
import prodConf from './prod.conf'

const merge = require('webpack-merge')


export const beestockApiConf = {
  url: 'http://api.beesstock.com',
  acceptHeader: {
    json: 'application/json'
  },
  contentType: {
    formUrlEncoded: 'application/x-www-form-urlencoded'
  }
}

export const logPrefixes = {
  errorLogPrefix: 'BEESTOCK-ERROR',
  infoLogPrefix: 'BEESTOCK-INFO'
}

export const userRoles = {
  INACTIVE: 'ROLE_INACTIVE',
  ACTIVE: 'ROLE_ACTIVE_USER'
}

export const routeConditions = {
  NO_LOGIN: 'NoLogin',
  SYSTEM_ONLY: 'SystemOnly',
  VERIFIED_USER: 'VerifiedUser',
  AUTHENTICATED_USER: 'AuthenticatedUser'
}

let config = {
  beestockApiConf,
  routeConditions,
  logPrefixes,
  userRoles
}

switch (process.env.NODE_ENV) {
  case 'production':
    config = merge(config, prodConf)
    break

  case 'development':
    config = merge(config, devConf)
    break

  default:
    console.error(logPrefixes.errorLogPrefix, 'Configured environment is not supported!')
}

export default config
