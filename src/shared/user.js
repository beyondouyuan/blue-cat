import { getCacheSync, setCacheSync } from "./storage";

const LOCAL_USER_INFO = 'LOCAL_USER_INFO'

export function setUserInfoCacheSync(v) {
  setCacheSync(LOCAL_USER_INFO, v)
}

export function getUserInfoCacheSync() {
  return getCacheSync(LOCAL_USER_INFO) || null
}