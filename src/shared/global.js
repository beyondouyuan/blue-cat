import { getCacheSync, setCacheSync } from "./storage";

const LOCAL_MERCHANT_CACHE = 'LOCAL_MERCHANT_CACHE'

const LOCAL_ORDER_ID_CACHE = 'LOCAL_ORDER_ID_CACHE'

export function setMerchantCacheSync(v) {
  setCacheSync(LOCAL_MERCHANT_CACHE, v)
}

export function getMerchantCacheSync() {
  return getCacheSync(LOCAL_MERCHANT_CACHE) || null
}

export function setOrderIdCacheSync(v) {
  setCacheSync(LOCAL_ORDER_ID_CACHE, v)
}

export function getOrderIdCacheSync() {
  return getCacheSync(LOCAL_ORDER_ID_CACHE) || null
}