import Taro from '@tarojs/taro'

// 同步设置缓存
export const setCacheSync = (k, v) => {
  Taro.setStorageSync(k, v)
}

// 同步获取缓存
export const getCacheSync = k => {
  return Taro.getStorageSync(k)
}
// 同步移除
export const removeCacheSync = k => {
  return Taro.removeStorageSync(k)
}

// 设置一个全局对象
const globalData = {}

// 设置全局变量数据
export const setGlobalData = (k, v) => {
  globalData[k] = v
}

// 获取全局变量数据
export const getGlobalData = k => {
  return globalData[k]
}

// 移除全局变量数据
export const removeGlobalData = k => {
  delete globalData[k];
}