import Taro from '@tarojs/taro'

export const showLoading = ({ title = "正在加载...", mask = true } = {}) => {
  Taro.showLoading({
    title,
    mask
  })
    .then(res => res)

}

export const hideLoading = () => {
  Taro.hideLoading()
}