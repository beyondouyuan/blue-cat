import { getCacheSync, setCacheSync } from "./storage";

const LOCAL_MERCHANT_CACHE = 'LOCAL_MERCHANT_CACHE'

export function setMerchantCacheSync(v) {
  setCacheSync(LOCAL_MERCHANT_CACHE, v)
}

export function getMerchantCacheSync() {
  return getCacheSync(LOCAL_MERCHANT_CACHE) || null
}