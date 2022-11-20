import { Component } from 'react'
import { View } from '@tarojs/components'

import { getCurrentInstance } from '../../shared/get-instance'
import { hideLoading, showLoading } from '../../shared/loading'
import { showToast } from '../../shared/toast'
import { handleRedirectTo } from '../../shared/navigator'
import { requestParams } from '../../service/order'
import { handlePay } from '../../shared/pay'

import './index.scss'


class MemberPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.handleRetryPay()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  $instance = getCurrentInstance()

  async handleRetryPay() {
    try {
      showLoading({
        title: '请稍后...'
      })
      const { orderId, merchantNum, amount } = this.$instance.router.params
      const customParams = {
        productOrderId: orderId,
        appPayType: 'WXPAY',
        payType: 'APPLET',
        merchantNum,
        amount
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
                  orderId: orderId,
                  status: 'cancel',
                  merchantNum,
                  amount: amount
                }
              })
              break
            case 'requestPayment:ok':
              handleRedirectTo({
                path: `/pages/result/index`,
                params: {
                  orderId: orderId,
                  status: 'success',
                  merchantNum,
                  amount: amount
                }
              })
              break
            default:
              handleRedirectTo({
                path: `/pages/result/index`,
                params: {
                  orderId: orderId,
                  status: 'fail',
                  merchantNum,
                  amount: amount
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
        title: '支付失败'
      })
      handleRedirectTo({
        path: `/pages/mine/index`
      })
    }
  }

  render() {
    return (
      <View className='page-container member-page'>
        <View></View>
      </View>
    )
  }
}

export default MemberPage

