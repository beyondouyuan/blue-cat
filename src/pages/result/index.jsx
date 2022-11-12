import { Component } from 'react'
import { View } from '@tarojs/components'
import { handleNavigateTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'

import './index.scss'
import BaseButton from '../../components/Button'


class ResultPage extends Component {
  constructor(props) {
    super(props)
    this.handleMenuPress = this.handleMenuPress.bind(this)
    this.handleSwitchHome = this.handleSwitchHome.bind(this)
    this.handleSwitchOrder = this.handleSwitchOrder.bind(this)
    this.handleSwitchPay = this.handleSwitchPay.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = getCurrentInstance()

  handleMenuPress (type) {
    const _self = this
    const action = {
      home: _self.handleSwitchHome,
      order: _self.handleSwitchOrder,
      pay: _self.handleSwitchPay
    }

    action[type] && action[type]()
  }

  getText () {
    const { status } = this.$instance.router.params
    const dictionary = {
      success: '支付成功',
      fail: '支付失败',
      cancel: '取消支付'
    }

    return dictionary[status] || ''
  }

  handleSwitchHome () {
    handleNavigateTo({
      path: `/pages/store/index`
    })
  }

  handleSwitchOrder () {
    const { orderId } = this.$instance.router.params
    handleNavigateTo({
      path: `/pages/order/index`,
      params: {
        orderId: orderId
      }
    })
  }

  handleSwitchPay () {
    const { orderId } = this.$instance.router.params
    handleNavigateTo({
      path: `/pages/pay/index`,
      params: {
        orderId: orderId
      }
    })
  }

  render () {
    const { status } = this.$instance.router.params
    const success = status === 'success'
    return (
      <View className='page-container result-page'>
        <View className='result-container'>
          <View className='result-content'>
            <View className='result-content__text'>{this.getText()}</View>
          </View>
          <View className='result-action'>
            <View className='result-action__item'>
              <BaseButton type='warning' size='normal' full onClick={() => this.handleMenuPress('order')}>查看订单</BaseButton>
            </View>
            <View className='result-action__item'>
              {
                success ? (
                  <BaseButton size='normal' full onClick={() => this.handleMenuPress('home')}>返回首页</BaseButton>
                ) : (
                  <BaseButton type='success' size='normal' full onClick={() => this.handleMenuPress('pay')}>再次支付</BaseButton>
                )
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ResultPage

