import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'


class RecordPage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-container record-page'>
        <View><Text>订单列表</Text></View>
      </View>
    )
  }
}

export default RecordPage

