import { apiPost } from "../shared/http";

export function requestMerchantTable(data) {
  return apiPost({
    url: '/wechat/queryMerchantTable',
    data,
    bizType: 'queryMerchantTable'
  })
}

export function requestProductList(data) {
  return apiPost({
    url: '/wechat/queryProductList',
    data,
    bizType: 'queryProductList'
  })
}

export function requestProductDimension(data) {
  return apiPost({
    url: '/wechat/querySpecifications',
    data,
    bizType: 'querySpecifications'
  })
}

export function requestCreateShoppingCart(data) {
  return apiPost({
    url: '/wechat/operationShoppingCart',
    data,
    bizType: 'operationShoppingCart'
  })
}
