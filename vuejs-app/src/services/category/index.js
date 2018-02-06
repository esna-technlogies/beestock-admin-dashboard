import getFormData from 'form-data-urlencoded'
import store from '../../store'

import helpers from '../../helpers'
import api from '../beestock-api'

const categoryEndpoint = store.getters.categoryEndpoint

let findByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: categoryEndpoint.findByUUID,
    pathParams: {
      uuid
    }
  })
  return api.get(url)
}

let create = (queryParams = {}) => {
  const url = categoryEndpoint.create
  return api.post(url, getFormData(queryParams))
}

let updateByUUID = (uuid, queryParams = {}) => {  // To be implemented later
  // const url = helpers.reformatUrl({
  //   url: "",
  //   pathParams: {uuid}
  // })
  // return api.patch(url, getFormData(queryParams))
}

let deleteByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: categoryEndpoint.delete,
    pathParams: {
      uuid
    }
  })
  return api.delete(url)
}



export default {
  findByUUID,
  create,
  updateByUUID,
  deleteByUUID
}
