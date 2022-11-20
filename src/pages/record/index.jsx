import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { requestOrderList } from '../../service/order'
import Content from './components/Content'
import { handleNavigateTo, handleRedirectTo } from '../../shared/navigator'
import { getMerchantCacheSync } from '../../shared/global'

class RecordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceData: []
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.handleSwitchPay = this.handleSwitchPay.bind(this)
  }

  componentDidMount () {
    this.handleFetchData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $merchantCache = getMerchantCacheSync() || {}

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

  handleSwitchPay (data) {
    handleRedirectTo({
      path: '/pages/pay/index',
      params: {
        orderId: data.orderNum,
        merchantNum: this.$merchantCache.merchantNum,
        amount: data.orderAmount
      }
    })
  }

  handleCancel () {
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

