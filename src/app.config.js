// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    'pages/index/index', // 选择餐桌
    // 'pages/merchant/index', // 商户支付吗进入页面
    'pages/store/index', // 店铺
    'pages/book/index', // 下单
    'pages/result/index', // 支付结果
    'pages/record/index', // 订单列表
    'pages/order/index', // 订单详情
    'pages/pay/index', // 重新支付中转页
    'pages/mine/index', // 个人中心
    'pages/member/index' // 加入会员
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3281FF',
    navigationBarTitleText: '891',
    navigationBarTextStyle: 'white'
  }
})
