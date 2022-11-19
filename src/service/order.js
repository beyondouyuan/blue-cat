import { apiPost } from "../shared/http";

export function requestCreateOrder(data) {
  return apiPost({
    url: '/wechat/creatProductOrder',
    data,
    bizType: 'creatProductOrder'
  })
}

export function requestOrderList(data) {
  return apiPost({
    url: '/wechat/queryHistoryProductOrder',
    data,
    bizType: 'queryHistoryProductOrder'
  })
}

export function requestParams(data) {
  return apiPost({
    url: '/wechat/customerPay',
    data,
    bizType: 'customerPay'
  })
}

export function requestOrderDetail(data) {
  return apiPost({
    url: '/wechat/queryHistoryProductOrder',
    data,
    bizType: 'queryHistoryProductOrder'
  })
}
