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

export function requestArea(data) {
  return apiPost({
    url: '/wechat/queryRegionInfo',
    data,
    bizType: 'queryRegionInfo'
  })
}

export function createMember(data) {
  return apiPost({
    url: '/wechat/becomeMember',
    data,
    bizType: 'becomeMember'
  })
}

export function requestMember(data) {
  return apiPost({
    url: '/wechat/memberDetail',
    data,
    bizType: 'memberDetail'
  })
}

export function requestUserInfo(data) {
  return apiPost({
    url: '/wechat/userInfoDetail',
    data,
    bizType: 'userInfoDetail'
  })
}