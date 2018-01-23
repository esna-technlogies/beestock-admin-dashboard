import store from '../store'
import JwtDecode from 'jwt-decode'

/*
 * JWT Token Related Functions
 */
let jwtTokenName = store.getters.jwtTokenName

let setJwtTokenInCookie = (tokenValue) => {
  document.cookie = `${jwtTokenName}=${tokenValue}; Path=/`
}

let removeJwtToken = () => {
  document.cookie = `${jwtTokenName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

let getTokenValueFromCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieParts = decodedCookie.split(';')

  for (let i = 0; i < cookieParts.length; i++) {
    let part = cookieParts[i]

    if (part.indexOf(`${jwtTokenName}=`) === 0) {
      return part.substring(jwtTokenName.length + 1, part.length)
    }
  }

  return ''
}

let getUserRolesFromJwtToken = (token) => {
  return JwtDecode(token).roles
}

let getUUIDFromToken = (token) => {
  return JwtDecode(token).userId
}

let jwtTokenIsInvalid = () => {
  return !getTokenValueFromCookie()
}

let jwtTokenIsExpired = () => {
  const token = getTokenValueFromCookie()
  const decoded = JwtDecode(token)
  const nowUnixTimestamp = Math.floor(new Date() / 1000)
  const tokenUnixTimestamp = decoded.exp
  const MaxTimstamp = Math.max(nowUnixTimestamp, tokenUnixTimestamp)

  return MaxTimstamp === nowUnixTimestamp
}

/*
 *
 */
let reformatUrl = ({ url, pathParams = {}, queryParams = {} }) => {
  url = writePathParams(url, pathParams)
  url = writeQueryParams(url, queryParams)
  return url
}

let writePathParams = (url, pathParams) => {
  if (Object.keys(pathParams).length !== 0) {
    for (let param of Object.keys(pathParams)) {
      url = url.replace(`{${param}}`, pathParams[param])
    }
  }
  return url
}

let writeQueryParams = (url, queryParams) => {
  if (Object.keys(queryParams).length !== 0) {
    url = url + '?'
    for (let param of Object.keys(queryParams)) {
      url = `${url}${param}=${queryParams[param]}&`
    }
  }
  return url.replace(/&$/, '')
}


export default {
  setJwtTokenInCookie,
  removeJwtToken,
  getTokenValueFromCookie,
  getUserRolesFromJwtToken,
  getUUIDFromToken,
  jwtTokenIsInvalid,
  jwtTokenIsExpired,
  reformatUrl
}
