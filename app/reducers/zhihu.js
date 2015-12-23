import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import actionType from '../lib/actionType'

const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [actionType.common.zhihuNewsResponse](state, action) {
    return state.merge({
      news: action.response
    })
  }
})
