import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import { requestOrderDetail } from '../../service/order'

import { getCurrentInstance } from '../../shared/get-instance'
import Content from './components/Content'
import Footer from './components/Footer'
import { showToast } from '../../shared/toast'


class OrderPage extends Component {

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
  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = getCurrentInstance()

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

  handleSwitchPay () {
    showToast({title: '根据productOrderStatusCode是否可去支付'})
  }

  handleCancel () {
    showToast({title: '根据productOrderStatusCode是否可取消'})
  }

  render () {
    const { sourceData } = this.state
    return (
      <View className='page-container order-page'>
        <Content
          sourceData={sourceData}
        />
        <Footer
          onPay={this.handleSwitchPay}
          onCancel={this.handleCancel}
        />
      </View>
    )
  }
}

export default OrderPage

