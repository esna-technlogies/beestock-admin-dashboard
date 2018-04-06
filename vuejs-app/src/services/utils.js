import JwtDecode from 'jwt-decode'

export default {
  hex2rgb (hex, opacity) {
    hex = (hex + '').trim()

    let rgb = null
    let match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/)

    if (!match) {
      return null
    }

    rgb = {}

    hex = match[1]

    if (hex.length === 6) {
      rgb.r = parseInt(hex.substring(0, 2), 16)
      rgb.g = parseInt(hex.substring(2, 4), 16)
      rgb.b = parseInt(hex.substring(4, 6), 16)
    } else if (hex.length === 3) {
      rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16)
      rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16)
      rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16)
    }

    rgb.css = 'rgb' + (opacity ? 'a' : '') + '('
    rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b
    rgb.css += (opacity ? ',' + opacity : '') + ')'

    return rgb
  },
  getCurrentUserUUID () {
    return localStorage.getItem('uuid')
  },

  getCurrentUserJwtToken () {
    return localStorage.getItem('jwtToken')
  },

  getCurrentUserRoles () {
    const currentUserRoles = localStorage.getItem('roles')
    return currentUserRoles ? currentUserRoles.split(',') : []
  },

  getJwtTokenExpireDate () {
    const jwtToken = this.getCurrentUserJwtToken()
    return jwtToken ? new Date(JwtDecode(jwtToken).exp * 1000) : new Date(0)
  },

  getCurrentUserFullName () {
    return `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`
  },

  storeCurrentUserDetails (userDetails) {
    Object.keys(userDetails)
      .map(item => localStorage.setItem(item, userDetails[item]))
  },

  storeCurrentUserJwtToken (token) {
    localStorage.setItem('jwtToken', token)
  },

  clearAuthStorage () {
    localStorage.clear()
  }
}
