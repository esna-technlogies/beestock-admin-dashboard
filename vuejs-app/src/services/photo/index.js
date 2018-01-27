import helpers from '../../helpers'
import api from '../beestock-api'

import store from '../../store'

const photoEndpoint = store.getters.photoEndpoint


let findAll = (queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  })
  return api.get(url)
}

let findByUserUUID = (uuid, queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findByUserUUID,
    pathParams: { uuid: uuid },
    queryParams
  })

  return api.get(url)
}



export default {
  findAll,
  findByUserUUID
}
