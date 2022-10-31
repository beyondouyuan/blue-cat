import { getCacheSync, setCacheSync } from "./storage";

const LOCAL_USER_INFO = 'LOCAL_USER_INFO'
const LOCAL_USER_TOKEN = 'LOCAL_USER_TOKEN'

export function setUserInfoCacheSync(v) {
  setCacheSync(LOCAL_USER_INFO, v)
}

export function getUserInfoCacheSync() {
  return getCacheSync(LOCAL_USER_INFO) || null
}

export function setUserTokenCacheSync(v) {
  setCacheSync(LOCAL_USER_TOKEN, v)
}

export function getUserTokenCacheSync() {
  return getCacheSync(LOCAL_USER_TOKEN) || null
}