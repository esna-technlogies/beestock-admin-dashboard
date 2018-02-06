import helpers from '../../helpers'
import api from '../beestock-api'
import userService from '../../services/user'
import categoryService from '../../services/category'

import store from '../../store'

const photoEndpoint = store.getters.photoEndpoint


let findAll = (queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  })
  return api.get(url)
}

let findByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findByUUID,
    pathParams: { uuid }
  })
  return api.get(url)
}

let deleteByUUID = (uuid) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.deleteByUUID,
    pathParams: { uuid }
  })
  return api.delete(url)
}

let findByUserUUID = (uuid, queryParams) => {
  const url = helpers.reformatUrl({
    url: photoEndpoint.findByUserUUID,
    pathParams: { uuid },
    queryParams
  })

  return api.get(url)
}

let fetchPhotoUser = (uuid) => {
  return userService.findByUUID(uuid)
    .then(response => response.data.user)
}

let fetchPhotoCategory = (uuid) => {
  return categoryService.findByUUID(uuid)
    .then(response => response.data.category)
}


export default {
  findAll,
  findByUUID,
  deleteByUUID,
  findByUserUUID,
  fetchPhotoUser,
  fetchPhotoCategory
}
