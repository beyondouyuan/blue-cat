import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import UserInfo from './components/UserInfo'
import Menu from './components/Menu'
import { handleNavigateTo } from '../../shared/navigator'
import { requestUserInfo } from '../../service/user'

class MinePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceData: {}
    }

    this.handleFetchData = this.handleFetchData.bind(this)
  }
  componentDidMount () {
    this.handleFetchData()
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleFetchData () {
    requestUserInfo()
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

  render () {
    const { sourceData } = this.state
    return (
      <View className='page-container mine-page'>
        <UserInfo
          data={sourceData}
        />
        <Menu
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

export default MinePage

