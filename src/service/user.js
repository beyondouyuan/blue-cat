import { apiPost } from "../shared/http";

export function requestLogin(data) {
  return apiPost({
    url: '/wechat/userInfo',
    data,
    bizType: 'userInfo'
  })
}

export function requestPhone(data) {
  return apiPost({
    url: '/wechat/getUserPhone',
    data,
    bizType: 'getUserPhone'
  })
}

export function queryPhone(data) {
  return apiPost({
    url: '/wechat/userPhoneQuery',
    data,
    bizType: 'userPhoneQuery'
  })
}