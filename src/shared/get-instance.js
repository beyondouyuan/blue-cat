import Taro from '@tarojs/taro'

export function getCurrentInstance () {
  return Taro.getCurrentInstance()
}

export function getCurrentRouterParams () {
  const current = getCurrentInstance()
  return current.router.params
}