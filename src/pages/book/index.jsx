import { Component } from 'react'
import { View } from '@tarojs/components'

import Dialog from '../../components/Dialog'
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
import { getMerchantCacheSync, getOrderIdCacheSync, setOrderIdCacheSync } from '../../shared/global'


class BookPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingCartList: [],
      sumAmount: 0,
      productOrderId: '',
      isOpendDialog: false,
      immediatePay: false
    }

    this.fetchShopCartList = this.fetchShopCartList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleOrderPay = this.handleOrderPay.bind(this)
    this.handlePressConfirm = this.handlePressConfirm.bind(this)
  }


  componentDidMount() {
    this.fetchShopCartList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  $instance = getCurrentInstance()
  $merchantCache = getMerchantCacheSync() || {}

  handleOpenDialog() {
    this.setState({
      isOpendDialog: true
    })
  }

  fetchShopCartList() {
    const { payTag } = this.$merchantCache
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
        const { shoppingCartList, sumAmount } = res
        this.setState({
          shoppingCartList,
          sumAmount
        })
      })
      .catch(e => {
        console.log('e', e.code)
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

  async handleOrderPay() {
    const { sumAmount, productOrderId } = this.state
    // if (!productOrderId) return
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
    const { payTag } = this.$merchantCache
    const { immediatePay } = this.state
    try {
      showLoading({
        title: '请稍后...'
      })
      // 立即支付：已经创建订单，可以去支付了
      if (payTag && immediatePay) {
        this.handleOrderPay()
        return
      }
      // 创建预支付订单：还未创建订单，需先创建订单
      const orderResult = await this.handleCreateOrder()
      const productOrderId = orderResult.productOrderId
      // 写成同步好处理
      await this.setStatePromise({
        productOrderId
      }, productOrderId)
      // 弹窗询问：若是先下单，再支付，在创建预支付单成功后弹窗询问是否立即支付
      if (payTag) {
        setOrderIdCacheSync(productOrderId)
        this.handleOpenDialog()
        hideLoading()
        return
      }
      // 支付：若是先支付，再下单，则在创建预支付订单后立刻支付，完成整个流程
      this.handleOrderPay()
    } catch (error) {
      hideLoading()
      showToast({
        title: '下单失败'
      })
    }
  }

  handlePressConfirm () {
    console.log('ah')
    this.handleOrderPay()
  }

  handleCloseDialog () {
    this.setState({
      isOpendDialog: false,
      immediatePay: true
    })
  }

  render() {
    const { shoppingCartList, sumAmount, isOpendDialog, immediatePay } = this.state
    const { tableName } = this.$instance.router.params
    const { payTag } = this.$merchantCache
    return (
      <View className='page-container book-page'>
        <Content
          list={shoppingCartList}
          sumAmount={sumAmount}
          tableName={tableName}
        />
        <Submit
          sumAmount={sumAmount}
          onPress={this.handlePress}
          onSubmit={this.handleSubmit}
          payTag={payTag}
          immediatePay={immediatePay}
        />

        <Dialog
          opened={isOpendDialog}
          center
          title='提示'
          content='下单成功！是否立即支付？'
          cancelText='暂不支付'
          confirmText='立即支付'
          onConfirm={this.handlePressConfirm}
          onCancel={this.handleCloseDialog}
        />
      </View>
    )
  }
}

export default BookPage

