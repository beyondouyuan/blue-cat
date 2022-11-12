import { Component } from "react"
import { View, ScrollView } from '@tarojs/components'

import Item from './Item'

class Content extends Component {
  render() {
    const { sourceData, threshold = 100, onPress } = this.props
    return (
      <ScrollView
        className='content-container'
        scrollY
        scrollWithAnimation
        lowerThreshold={threshold}
      >
        <View className='content'>
          {
            sourceData.length ? sourceData.map(item => {
              return (
                <Item key={item.orderNum} data={item} onPress={onPress} />
              )
            }) : null
          }
        </View>
      </ScrollView>
    )
  }
}

export default Content