import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
import { requestOrderList } from '../../service/order'

import { getCurrentInstance } from '../../shared/get-instance'


class OrderPage extends Component {

  constructor(props) {
    super(props)
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
    requestOrderList(condition)
      .then(res => {
        console.log(res)
        // this.setState({
        //   sourceData: res
        // })
      })
  }

  render () {
    return (
      <View className='page-container order-page'>
        <View><Text>订单详情</Text></View>
      </View>
    )
  }
}

export default OrderPage

