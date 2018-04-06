const reformatUrl = ({url, pathParams = {}, queryParams = {}}) => {
  url = replacePathParamsOfUrl(url, pathParams)
  url = addQueryParamsToUrl(url, queryParams)

  return url
}

const replacePathParamsOfUrl = (url, pathParams) => {
  const pathParamsKeys = Object.keys(pathParams)

  if (pathParamsKeys.length !== 0) {
    for (const param of pathParamsKeys) {
      url = url.replace(`{${param}}`, pathParams[param])
    }
  }

  return url
}

const addQueryParamsToUrl = (url, queryParams) => {
  const queryParamsKeys = Object.keys(queryParams)

  if (queryParamsKeys.length !== 0) {
    url = url + '?'

    for (const param of queryParamsKeys) {
      url = `${url}${param}=${queryParams[param]}&`
    }

    return url.replace(/&$/, '')
  }

  return url
}


export default {
  reformatUrl
}
