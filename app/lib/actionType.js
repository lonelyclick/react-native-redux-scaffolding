import Immutable from 'immutable'

function keyMirror(object) {
  return Immutable.fromJS(object).map((value, key) => {
    return value.map((actionValue, actionType) => `${key}_${actionType}`)
  }).toJS()
}

export default keyMirror({
  common: {
    requestFail: null,
    zhihuNewsResponse: null
  }
})
