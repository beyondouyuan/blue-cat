import Taro from '@tarojs/taro'

export const showToast = ({ title = "成功", type = "none", duration = 2000 } = {}) => {
  Taro.showToast({
    title,
    icon: type,
    duration
  })
    .then(res => res)
}