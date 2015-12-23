import { CALL_API } from '../middleware/api'
import actionType from '../lib/actionType'

export function requestFail(error) {
  return {
    type: actionType.common.requestFail,
    error,
    createdAt: Date.now()
  }
}

export function fetchZhihuNews() {
  return {
    [CALL_API]: {
      successType: actionType.common.zhihuNewsResponse,
      endpoint: 'http://news-at.zhihu.com/api/4/news/latest'
    }
  }
}

export function loadZhihuNews() {
  return dispatch => {
    return dispatch(fetchZhihuNews())
  }
}
