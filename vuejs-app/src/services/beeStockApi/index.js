import axios from 'axios/index'
import helpers from '../../helpers'

const authorizationHeader = `Bearer ${helpers.getTokenValueFromCookie().trim()}`

axios.defaults.baseURL = 'http://api.beesstock.com/'
axios.defaults.headers.common['Authorization'] = authorizationHeader
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}
