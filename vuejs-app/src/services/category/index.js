import getFormData from 'form-urlencoded'

import {urlHelper} from '../../helpers'
import api from '../../api/beestock'
import { category as categoryEndpoint } from '../../api/beestock/endpoints'

let findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
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
  // const url = urlHelper.reformatUrl({
  //   url: "",
  //   pathParams: {uuid}
  // })
  // return api.patch(url, getFormData(queryParams))
}

let deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
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
