import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { requestOrderDetail } from '../../service/order'
import { handleRedirectTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'
import { getMerchantCacheSync } from '../../shared/global'

import Content from './components/Content'
import Footer from './components/Footer'


class OrderPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sourceData: {}
    }
    this.handleFetchData = this.handleFetchData.bind(this)
    this.handleSwitchPay = this.handleSwitchPay.bind(this)
  }

  componentDidMount () {
    this.handleFetchData()
  }
  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = getCurrentInstance()
  $merchantCache = getMerchantCacheSync() || {}

  handleFetchData () {
    const { orderId } = this.$instance.router.params
    if (!orderId) return
    const condition = {
      orderId
    }
    requestOrderDetail(condition)
      .then(res => {
        this.setState({
          sourceData: res
        })
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

  handleCancel () {}

  render () {
    const { sourceData } = this.state
    return (
      <View className='page-container order-page'>
        <Content
          sourceData={sourceData}
        />
        <Footer
          data={sourceData}
          onPay={this.handleSwitchPay}
          onCancel={this.handleCancel}
        />
      </View>
    )
  }
}

export default OrderPage

