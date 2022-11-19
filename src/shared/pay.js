import Taro from '@tarojs/taro'

export async function handlePay(params) {
  return await Taro.requestPayment(params)
}

export async function handleCodePay(params) {
  return await wx.openOfflinePayView(params)
}

export async function handleScanPay(params) {
  return await Taro.scanCode(params)
}