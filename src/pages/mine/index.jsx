import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { getUserInfoCacheSync, getUserTokenCacheSync } from '../../shared/user'
import UserInfo from './components/UserInfo'
import Menu from './components/Menu'
import { handleNavigateTo } from '../../shared/navigator'
import { requestMember } from '../../service/user'
import { handleCodePay, handleScanPay } from '../../shared/pay'

class MinePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      sourceData: {},
      token: ''
    }

    this.handleGetUserInfo = this.handleGetUserInfo.bind(this)
    this.handleFetchMember = this.handleFetchMember.bind(this)
  }
  componentDidMount () {
    this.handleGetUserInfo()
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleGetUserInfo () {
    const userInfo = getUserInfoCacheSync()
    const token = getUserTokenCacheSync()
    this.setState({
      userInfo: userInfo,
      token
    }, () => {
      this.handleFetchMember()
    })
  }

  handleFetchMember () {
    const { token } = this.state
    if (!token) return
    requestMember()
      .then(res => {
        this.setState({
          sourceData: res
        })
      })
  }

  handlePress (item) {
    handleNavigateTo({
      path: item.path
    })
  }

  handleScan() {
    const condition = {
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {},
      onlyFromCamera: true
    }
    handleScanPay(condition)
  }

  handleCode() {
    const condition = {
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {}
    }
    handleCodePay(condition)
  }

  render () {
    const { userInfo, sourceData } = this.state
    return (
      <View className='page-container mine-page'>
        <UserInfo
          data={userInfo}
          sourceData={sourceData}
          onScan={this.handleScan}
          onCode={this.handleCode}
        />
        <Menu
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

export default MinePage

