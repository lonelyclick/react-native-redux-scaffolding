import { requestFail } from '../actions/common'
import serialize from '../lib/serialize'

export const CALL_API = 'Call API'

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, fetchOption } = callAPI
  const { query, successType, successParam, noFetch } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (query && typeof query !== 'object') {
    throw new Error('Specify a object query.')
  }

  const fetchOptionType = typeof fetchOption

  if (fetchOptionType !== 'undefined' && fetchOptionType !== 'object') {
    throw new Error('Specify a object fetchOption')
  }

  if (typeof successType !== 'string') {
    throw new Error('Specify a successType')
  }

  fetchOption = fetchOption || {}
  const method = fetchOption.method = fetchOption.method || 'get'

  if (query && method.toUpperCase() === 'GET') {
    endpoint = `${endpoint}?${serialize(query)}`
  } else {
    fetchOption.headers = fetchOption.headers || {}
    fetchOption.headers['Accept'] = 'application/json'
    fetchOption.headers['Content-Type'] = 'application/json'
    fetchOption.body = fetchOption.body || JSON.stringify(query)
  }

  fetchOption = Object.assign({}, fetchOption, { credentials: 'include' })

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  return fetch(endpoint, fetchOption)
    .then(res => {
      fetchOption.dataType = fetchOption.dataType || 'json'
      let payload

      if (res.status >= 200 && res.status < 300 || res.status === 304) {
        if (fetchOption.dataType === 'json') {
          payload = res.json()
        }
      } else {
        const contentType = res.headers.get('Content-Type')
        if (contentType.startsWith('application/json')) {
          return res.json().then(error => {
            throw new Error(`KNOWN ERROR : ${error.code} - ${error.message}`)
          })
        }
        throw new Error(`HTTP ERROR : ${res.status} - ${res.statusText}`)
      }
      return payload
    })
    .then(response => {
      next(actionWith({
        response,
        type: successType,
        ...successParam
      }))
    })
    .catch(error => {
      next(actionWith(requestFail(String(error))))
      throw error
    })
}
