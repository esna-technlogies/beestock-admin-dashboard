import axios from 'axios/index'
import { beestockApi as apiConfig } from '../../config'
import utils from '../../services/utils'

axios.defaults.baseURL = apiConfig.url
axios.defaults.headers.common['Accept'] = apiConfig.acceptHeader.json
axios.defaults.headers.patch['Content-Type'] = apiConfig.contentType.formUrlEncoded

const setAuthorizationHeader = () => {
  const token = utils.getCurrentUserJwtToken()
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const removeAuthorizationHeader = () => {
  delete axios.defaults.headers.common['Authorization']
}

setAuthorizationHeader()

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  head: axios.head,
  setAuthorizationHeader,
  removeAuthorizationHeader
}
