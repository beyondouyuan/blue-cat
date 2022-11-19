import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { requestOrderList } from '../../service/order'
import Content from './components/Content'
import { handleNavigateTo } from '../../shared/navigator'

import { showToast } from '../../shared/toast'

class RecordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceData: []
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
    requestOrderList()
      .then(res => {
        this.setState({
          sourceData: res
        })
      })
  }

  handlePress (data) {
    handleNavigateTo({
      path: '/pages/order/index',
      params: {
        orderId: data.orderId
      }
    })
  }

  handleSwitchPay () {
    showToast({title: '根据productOrderStatusCode是否可去支付'})
  }

  handleCancel () {
    showToast({title: '根据productOrderStatusCode是否可取消'})
  }

  render () {
    const { sourceData } = this.state
    return (
      <View className='page-container record-page'>
        <Content
          sourceData={sourceData}
          onPress={this.handlePress}
          onPay={this.handleSwitchPay}
          onCancel={this.handleCancel}
        />
      </View>
    )
  }
}

export default RecordPage

