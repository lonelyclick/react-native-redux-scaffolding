import { bindActionCreators } from 'redux'
import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux/native'
import { loadZhihuNews } from '../actions/common'

import Button from 'apsl-react-native-button'

class Zhihu extends Component {
  onButtonClick = () => {
    const { loadZhihuNews } = this.props
    loadZhihuNews()
  }

  render() {
    const { zhihu } = this.props
    const topStories = zhihu.getIn(['news', 'top_stories'])

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <Button style={{backgroundColor: 'green'}} textStyle={{fontSize: 18}} onPress={this.onButtonClick}>
          加载知乎日报最新消息
        </Button>
        <Text>
          {
            topStories && topStories.map(story => {
              return story.get('title')
            }).join('\n\n')
          }
        </Text>
      </View>
    )
  }
}

export default connect(
  ({ zhihu }) => ({ zhihu }),
  {
    loadZhihuNews
  }
)(Zhihu)
