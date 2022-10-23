import Taro from '@tarojs/taro'
import { isEmptyObject } from './type'

/**
 * 格式化url入参数
 * @param {Object} params url参数对象
 * @param {Boolean} pure 是否需要encodeURIComponent
 */
export const formatParams = (params, pure = true) => {
  const arr = []
  Object.keys(params).forEach((key) => {
    if ({}.hasOwnProperty.call(params, key)) {
      if (params[key] === undefined) {
        console.error(`formatParams: 传参的键${key}的值为undefined，已丢弃`)
      } else {
        pure ? arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`) : arr.push(`${key}=${params[key]}`)
      }
    }
  })
  return arr.join('&')
};

/**
 * 跳转至非tabar页面
 * @param {Object} navigate 导航参数对象
 * @param {String} navigate.path pages路径
 * @param {Object} navigate.params url参数
 * @param {Object} events 事件对象
 * @param {Object} success 成功回调
 */
export const handleNavigateTo = (navigate = {}, events = {}, success = () => { }) => {
  const {
    path,
    params
  } = navigate
  const link = isEmptyObject(params) ? path : `${path}?${formatParams(params)}`
  Taro.navigateTo({
    url: link,
    events,
    success
  })
}

/**
 * 跳转至tabar页面
 * @param {Object} navigate 导航参数对象
 * @param {String} navigate.path tab路径
 */
export const handleSwitchTab = navigate => {
  const {
    path
  } = navigate
  Taro.switchTab({
    url: `${path}`
  })
}

/**
 * 重定向
 * @param {*} navigate 导航参数对象
 * @param {*} success 成功回调
 */
export const handleRedirectTo = (navigate, success = () => { }) => {
  const {
    path,
    params
  } = navigate
  const link = isEmptyObject(params) ? path : `${path}?${formatParams(params)}`
  Taro.redirectTo({
    url: `${link}`,
    success
  })
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {*} navigate
 * @param {*} success
 */
export const handleReLaunch = (navigate, success = () => { }) => {
  const {
    path,
    params
  } = navigate;
  const link = isEmptyObject(params) ? path : `${path}?${formatParams(params)}`
  Taro.reLaunch({
    url: `${link}`,
    success
  })
}

/**
 * 返回上一页
 * @param {*} navigate
 */
export const handleNavigateBack = (delta = 1) => {
  const pageCount = Taro.getCurrentPages().length
  // 尝试解决位于页面栈顶后退出栈导致的报错
  // *防止获取页面栈数量失败，如果获取失败则仍后退
  if (pageCount && pageCount < 2) {
    return
  }
  return Taro.navigateBack({ delta })
}