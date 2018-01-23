import axios from 'axios/index'
import helpers from '../../helpers'

axios.defaults.baseURL = 'http://api.beesstock.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${helpers.getTokenValueFromCookie().trim()}`
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'

let resetAuthorizationHeader = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${helpers.getTokenValueFromCookie().trim()}`
}

let getMethod = () => {
  resetAuthorizationHeader()
  return axios.get
}

let postMethod = () => {
  resetAuthorizationHeader()
  return axios.post
}

let putMethod = () => {
  resetAuthorizationHeader()
  return axios.put
}

let patchMethod = () => {
  resetAuthorizationHeader()
  return axios.patch
}

let deleteMethod = () => {
  resetAuthorizationHeader()
  return axios.delete
}

export default {
  get: getMethod(),
  post: postMethod(),
  put: putMethod(),
  patch: patchMethod(),
  delete: deleteMethod()
}
