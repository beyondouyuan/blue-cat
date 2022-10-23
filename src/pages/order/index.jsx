import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'


class OrderPage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-container order-page'>
        <View><Text>订单详情</Text></View>
      </View>
    )
  }
}

export default OrderPage

