import Taro from '@tarojs/taro'

export async function handlePay(params) {
  return await Taro.requestPayment(params)
}