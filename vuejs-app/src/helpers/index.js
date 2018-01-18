/* eslint-disable */

import store from '../store'
import JwtDecode from 'jwt-decode'
import router from '../router'
import axios from 'axios'

/*
 * JWT Token Functions
 */
let jwtTokenName = store.getters.jwtTokenName

let setJwtTokenInCookie = function (tokenValue) {
  document.cookie = `${jwtTokenName}=${tokenValue}; Path=/`
}

let removeJwtToken = function () {
  document.cookie = `${jwtTokenName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

let getTokenValueFromCookie = function () {
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

let getUserRolesFromJwtToken = function (token) {
  return JwtDecode(token).roles
}

let getUUIDFromToken = function (token) {
  console.log('userId', JwtDecode(token).userId);
  
  return JwtDecode(token).userId
}

let jwtTokenIsInvalid = function () {
  return getTokenValueFromCookie() ? false : true;
}

let jwtTokenIsExpired = function () {
  const token = getTokenValueFromCookie()
  const decoded = JwtDecode(token)
  const nowUnixTimestamp = Math.floor(new Date() / 1000);
  const tokenUnixTimestamp = decoded.exp;
  const MaxTimstamp = Math.max(nowUnixTimestamp, tokenUnixTimestamp)
  
  return MaxTimstamp === nowUnixTimestamp ? true : false;
}

/*
 *  Router Functions
 */
let routerPush = function (direction) {
  router.push(direction)
}

let routerReplace = function (direction) {
  router.replace(direction)
}


/*
 *  Function to create custom intances of Axios
 */
let getAxios = function() {
  return axios.create({
    baseURL: 'http://api.beesstock.com/',
  });
}

let getAxiosWithJwtToken = function() {
  return axios.create({
    baseURL: 'http://api.beesstock.com/',
    headers: {'Authorization': `Bearer ${getTokenValueFromCookie().trim()}`}
  });
}


export default {
  setJwtTokenInCookie,
  removeJwtToken,
  getTokenValueFromCookie,
  getUserRolesFromJwtToken,
  getUUIDFromToken,
  jwtTokenIsInvalid,
  jwtTokenIsExpired,
  routerPush,
  routerReplace,
  getAxios,
  getAxiosWithJwtToken
}
