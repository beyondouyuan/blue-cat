import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'


class LoginPage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page-container login-page'>
        <View><Text>登陆</Text></View>
      </View>
    )
  }
}

export default LoginPage

