// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    'pages/index/index', // 选择餐桌
    'pages/store/index', // 店铺
    'pages/book/index', // 下单
    'pages/pay/index', // 支付
    'pages/record/index', // 订单列表
    'pages/order/index', // 订单详情
    'pages/mine/index', // 个人中心
    'pages/login/index' // 登陆
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3281FF',
    navigationBarTitleText: '891',
    navigationBarTextStyle: 'white'
  }
})
