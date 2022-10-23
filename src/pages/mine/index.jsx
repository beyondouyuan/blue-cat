import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'


class MinePage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-container mine-page'>
        <View><Text>个人中心</Text></View>
      </View>
    )
  }
}

export default MinePage

