import { Component } from 'react'
import { View } from '@tarojs/components'

import Content from './components/Content'
import Submit from './components/Submit'

import { handleNavigateTo, handleRedirectTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'

import { requestOrderShoppingCartList, requestShoppingCartList } from '../../service/store'

import './index.scss'
import { hideLoading, showLoading } from '../../shared/loading'
import { showToast } from '../../shared/toast'
import { requestCreateOrder, requestParams } from '../../service/order'
import { handlePay } from '../../shared/pay'
import { getMerchantCacheSync, getOrderIdCacheSync, removeOrderIdCacheSync, setOrderIdCacheSync } from '../../shared/global'
import Compute from '../../shared/compute'


class BookPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceList: [],
      sumAmount: 0,
      productOrderId: ''
    }

    this.fetchShopCartList = this.fetchShopCartList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOrderPay = this.handleOrderPay.bind(this)
    this.handlePreOrder = this.handlePreOrder.bind(this)
  }


  componentDidMount() {
    this.handlePreOrder()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  $instance = getCurrentInstance()
  $merchantCache = getMerchantCacheSync() || {}

  fetchShopCartList() {
    const { payTag, teaSeatFee } = this.$merchantCache
    const orderIdCache = getOrderIdCacheSync()
    const { tableId } = this.$instance.router.params
    const condition = {
      tableId
    }
    let type = 'default'
    const action = {
      default: requestShoppingCartList,
      order: requestOrderShoppingCartList
    }
    if (payTag && orderIdCache) {
      type = 'order'
      condition['productOrderId'] = orderIdCache
      delete condition['tableId']
    }
    action[type](condition)
      .then(res => {
        const sourceList = type === 'default' ? [res] : res.redisData
        let totalPrice = 0
        for(let i = 0; i < sourceList.length; i++) {
          const sumAmount = sourceList[i]['sumAmount']
          totalPrice = Compute.add(totalPrice, sumAmount)
        }
        const allPrice = Compute.add(totalPrice, teaSeatFee)
        this.setState({
          sourceList,
          sumAmount: allPrice
        })
      })
      .catch(e => {
        console.log('e', e)
      })
  }

  handlePress() {
    handleNavigateTo({
      path: '/pages/store/index'
    })
  }

  handleCreateOrder() {
    const { tableId, peopleNum } = this.$instance.router.params
    const params = {
      tableId,
      peopleNum
    }
    return requestCreateOrder(params)
  }

  handlePreOrder () {
    const { isCreate} = this.$instance.router.params
    // 无需创单
    if (isCreate === '0') {
      this.fetchShopCartList()
      return
    }
    this.handleCreateOrder()
      .then(res => {
        const { productOrderId } = res
        setOrderIdCacheSync(productOrderId)
        this.setState({
          productOrderId: productOrderId
        }, () => {
          this.fetchShopCartList()
        })
      })
  }

  async handleOrderPay() {
    const { sumAmount, productOrderId } = this.state
    if (!productOrderId) return
    const { merchantNum } = this.$instance.router.params
    const params = {
      productOrderId,
      appPayType: 'WXPAY',
      payType: 'APPLET',
      merchantNum,
      amount: sumAmount
    }
    const customResult = await requestParams(params)
    const parsePayInfo = JSON.parse(customResult.payInfo)
    const payParams = {
      timeStamp: parsePayInfo.timeStamp || Date.now().toString(),
      nonceStr: parsePayInfo.nonceStr,
      package: parsePayInfo.package,
      paySign: parsePayInfo.paySign,
      signType: parsePayInfo.signType,
      appid: parsePayInfo.appId
    }
    const condition = {
      ...payParams,
      success: function (rs) {
        showToast({
          title: rs.errMsg === 'requestPayment:ok' ? '支付成功' : '支付成功'
        })
      },
      fail: function (rs) {
        showToast({
          title: rs.errMsg === 'requestPayment:fail cancel' ? '取消支付' : '支付失败'
        })
      },
      complete: (rs) => {
        removeOrderIdCacheSync()
        hideLoading()
        switch (rs.errMsg) {
          case 'requestPayment:fail cancel':
            handleRedirectTo({
              path: `/pages/result/index`,
              params: {
                orderId: productOrderId,
                status: 'cancel',
                merchantNum,
                amount: sumAmount
              }
            })
            break
          case 'requestPayment:ok':
            handleRedirectTo({
              path: `/pages/result/index`,
              params: {
                orderId: productOrderId,
                status: 'success',
                merchantNum,
                amount: sumAmount
              }
            })
            break
          default:
            handleRedirectTo({
              path: `/pages/result/index`,
              params: {
                orderId: productOrderId,
                status: 'fail',
                merchantNum,
                amount: sumAmount
              }
            })
            break
        }
      }
    }
    handlePay(condition)
  }

  setStatePromise (state, val) {
    return new Promise((res) => {
      this.setState(state, () => res(val))
    })
  }

  async handleSubmit() {
    showLoading({
      title: '请稍后...'
    })
    this.handleOrderPay()
  }

  render() {
    const { sourceList, sumAmount } = this.state
    const { tableName } = this.$instance.router.params
    const { payTag, teaSeatFee } = this.$merchantCache
    return (
      <View className='page-container book-page'>
        <Content
          sourceList={sourceList}
          sumAmount={sumAmount}
          tableName={tableName}
          teaSeatFee={teaSeatFee}
        />
        <Submit
          sumAmount={sumAmount}
          onPress={this.handlePress}
          onSubmit={this.handleSubmit}
          payTag={payTag}
        />
      </View>
    )
  }
}

export default BookPage

