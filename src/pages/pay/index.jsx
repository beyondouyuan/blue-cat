import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'


class IndexPage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-container index-page'>
        <View><Text>支付</Text></View>
      </View>
    )
  }
}

export default IndexPage

