import getFormData from 'form-data-urlencoded'
import store from '../../store'

import helpers from '../../helpers'
import api from '../beestock-api'

const userAccountEndpoint = store.getters.userAccountEndpoint

let findByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.findByUUID,
    pathParams: {
      uuid: uuid
    }
  })
  return api.get(url)
}

let updateByUUID = (uuid, queryParams = {}) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.partialUpdate,
    pathParams: {
      uuid: uuid
    }
  })
  return api.patch(url, getFormData(queryParams))
}

let deleteByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.delete,
    pathParams: {uuid}
  })
  return api.delete(url)
}



export default {
  findByUUID,
  updateByUUID,
  deleteByUUID
}
