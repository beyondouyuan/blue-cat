import { Component } from 'react'
import { View } from '@tarojs/components'
import Content from './components/Content'
import Submit from './components/Submit'

import { handleNavigateTo, handleRedirectTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'

import { requestShoppingCartList } from '../../service/store'

import './index.scss'
import { hideLoading, showLoading } from '../../shared/loading'
import { showToast } from '../../shared/toast'
import { requestCreateOrder, requestParams } from '../../service/order'
import { handlePay } from '../../shared/pay'

class BookPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingCartList: [],
      sumAmount: 0
    }

    this.fetchShopCartList = this.fetchShopCartList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount() {
    this.fetchShopCartList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  $instance = getCurrentInstance()

  fetchShopCartList() {
    requestShoppingCartList()
      .then(res => {
        const { shoppingCartList, sumAmount } = res
        this.setState({
          shoppingCartList,
          sumAmount
        })
      })
  }

  handlePress() {
    handleNavigateTo({
      path: '/pages/store/index'
    })
  }

  async handleSubmit() {
    try {
      showLoading({
        title: '请稍后...'
      })
      const { sumAmount } = this.state
      const { tableId, merchantNum } = this.$instance.router.params
      const createOrderParams = {
        tableId
      }
      const orderResult = await requestCreateOrder(createOrderParams)
      const productOrderId = orderResult.productOrderId
      const customParams = {
        productOrderId: productOrderId,
        appPayType: 'WXPAY',
        payType: 'APPLET',
        merchantNum,
        amount: sumAmount
      }
      const customResult = await requestParams(customParams)
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
                  status: 'cancel'
                }
              })
              break
            case 'requestPayment:ok':
              handleRedirectTo({
                path: `/pages/result/index`,
                params: {
                  orderId: productOrderId,
                  status: 'success'
                }
              })
              break
            default:
              handleRedirectTo({
                path: `/pages/result/index`,
                params: {
                  orderId: productOrderId,
                  status: 'fail'
                }
              })
              break
          }
        }
      }
      handlePay(condition)
    } catch (error) {
      hideLoading()
      showToast({
        title: '下单失败'
      })
    }
  }

  render() {
    const { shoppingCartList, sumAmount } = this.state
    return (
      <View className='page-container book-page'>
        <Content
          list={shoppingCartList}
          sumAmount={sumAmount}
        />
        <Submit
          sumAmount={sumAmount}
          onPress={this.handlePress}
          onSubmit={this.handleSubmit}
        />
      </View>
    )
  }
}

export default BookPage

