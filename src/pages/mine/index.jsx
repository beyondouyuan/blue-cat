import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { getUserInfoCacheSync } from '../../shared/user'
import UserInfo from './components/UserInfo'
import Menu from './components/Menu'
import { handleNavigateTo } from '../../shared/navigator'

class MinePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }

    this.handleGetUserInfo = this.handleGetUserInfo.bind(this)
  }
  componentDidMount () {
    this.handleGetUserInfo()
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleGetUserInfo () {
    const userInfo = getUserInfoCacheSync()
    this.setState({
      userInfo: userInfo
    })
  }

  handlePress (item) {
    handleNavigateTo({
      path: item.path
    })
  }

  render () {
    const { userInfo } = this.state
    return (
      <View className='page-container mine-page'>
        <UserInfo
          data={userInfo}
        />
        <Menu
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

export default MinePage

