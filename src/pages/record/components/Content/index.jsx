import { Component } from "react"
import { View, ScrollView } from '@tarojs/components'

import Item from './Item'

class Content extends Component {
  render() {
    const { sourceData, threshold = 100, onPress, onPay, onCancel } = this.props
    return (
      <ScrollView
        className='content-container'
        scrollY
        scrollWithAnimation
        scrollAnchoring
        fastDeceleration
        enhanced
        bounces={false}
        lowerThreshold={threshold}
      >
        <View className='content'>
          {
            sourceData.length ? sourceData.map(item => {
              return (
                <Item
                  key={item.orderNum}
                  data={item}
                  onPress={onPress}
                  onPay={onPay}
                  onCancel={onCancel}
                />
              )
            }) : null
          }
        </View>
      </ScrollView>
    )
  }
}

export default Content