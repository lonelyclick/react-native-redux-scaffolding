import React, { Component } from 'react-native'
import { Provider } from 'react-redux/native'

import Zhihu from './containers/Zhihu'
import store from './store'

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Zhihu />}
      </Provider>
    )
  }
}
