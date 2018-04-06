import getFormData from 'form-urlencoded'

import api from '../../api/beestock'
import {urlHelper} from '../../helpers'
import { userAccount as userAccountEndpoint } from '../../api/beestock/endpoints'

let findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: userAccountEndpoint.findByUUID,
    pathParams: {
      uuid: uuid
    }
  })
  return api.get(url)
}

let updateByUUID = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: userAccountEndpoint.partialUpdate,
    pathParams: {
      uuid: uuid
    }
  })
  return api.patch(url, getFormData(queryParams))
}

let deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
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
