import axios from 'axios/index'
import { beestockApiConf } from '../../config'
// import utils from '../../services/utils'


axios.defaults.baseURL = beestockApiConf.url
axios.defaults.headers.common['Accept'] = beestockApiConf.acceptHeader.json
axios.defaults.headers.patch['Content-Type'] = beestockApiConf.contentType.formUrlEncoded

const setAuthorizationHeader = (token) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

setAuthorizationHeader()


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  head: axios.head,
  setAuthorizationHeader
}
