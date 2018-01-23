import helpers from '../../helpers'
import api from '../beeStockApi'

import store from '../../store'

const photoEndpoint = store.getters.photoEndpoint


let findAll = (queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  })
  return returnPromiseOfResponse(api.get(url))
}

let findByUserUUID = (uuid, queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findByUserUUID,
    pathParams: { uuid: uuid },
    queryParams
  })

  return new Promise((resolve, reject) => {
    api.get(url)
      .then((response) => {
        if (response.status === 200) {
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

let returnPromiseOfResponse = (queryMethod) => {
  return new Promise((resolve, reject) => {
    queryMethod.then((response) => {
      if (response.status === 200) {
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
  findAll,
  findByUserUUID
}
