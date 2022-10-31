import { apiPost } from "../shared/http";

export function requestLogin(data) {
  return apiPost({
    url: '/wechat/userInfo',
    data,
    bizType: 'userInfo'
  })
}