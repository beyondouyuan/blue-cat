import { getCacheSync, setCacheSync } from "./storage";

const LOCAL_TABLE_ID = 'LOCAL_TABLE_ID'

export function setTableCacheSync(v) {
  setCacheSync(LOCAL_TABLE_ID, v)
}

export function getTableCacheSync() {
  return getCacheSync(LOCAL_TABLE_ID) || null
}