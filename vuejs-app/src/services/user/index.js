import getFormData from 'form-data-urlencoded'
import store from '../../store'

import helpers from '../../helpers'
import api from '../beeStockApi'

const userAccountEndpoint = store.getters.userAccountEndpoint

let findByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.findByUUID,
    pathParams: {
      uuid: uuid
    }
  })
  return returnPromiseOfResponse(api.get(url))
}

let updateByUUID = (uuid, queryParams = {}) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.partialUpdate,
    pathParams: {
      uuid: uuid
    }
  })
  return returnPromiseOfResponse(api.patch(url, getFormData(queryParams)))
}

let deleteByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: userAccountEndpoint.delete,
    pathParams: {uuid}
  })
  return returnPromiseOfResponse(api.delete(url))
}


let returnPromiseOfResponse = (queryMethod) => {
  return new Promise((resolve, reject) => {
    queryMethod.then((response) => {
      if ([200, 201, 202, 204].includes(response.status)) {
        resolve(response)
      } else {
        reject(response)
      }
    })
      .catch((error) => {
        reject(error.response)
      })
  })
}

export default {
  findByUUID,
  updateByUUID,
  deleteByUUID
}
