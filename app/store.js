import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import Immutable from 'immutable'

import * as rootReducer from './reducers/index'
import api from './middleware/api'

console.log(rootReducer)

const middlewares = [thunk, api]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    level: 'info',
    collapsed: true,
    predicate: true,
    stateTransformer: function(state) {
      const newState = {}
      for (const i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS()
        } else {
          newState[i] = state[i]
        }
      }
      return newState
    }
  }))
}

export default applyMiddleware(...middlewares)(createStore)(combineReducers(rootReducer))
