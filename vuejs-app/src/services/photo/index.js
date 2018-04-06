import api from '../../api/beestock'
import userService from '../../services/user'
import categoryService from '../../services/category'
import {urlHelper} from '../../helpers'
import { photo as photoEndpoint } from '../../api/beestock/endpoints'


let findAll = (queryParams) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  })
  return api.get(url)
}

let findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findByUUID,
    pathParams: { uuid }
  })
  return api.get(url)
}

let deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.deleteByUUID,
    pathParams: { uuid }
  })
  return api.delete(url)
}

let findByUserUUID = (uuid, queryParams) => {
  const url = urlHelper.reformatUrl({
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
