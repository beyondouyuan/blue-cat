import Taro from '@tarojs/taro'
import { APP_ID } from './config'
import { dencryptedDes, encryptedDes, encryptedRsa } from './security'
import { getUserTokenCacheSync } from './user'

const BASE_API = 'http://lanmaogo.891tech.com/lanmaogo-website/interface'

/**
 * request封装
 */
const request = async (options) => {
  const { bizType, url, data } = options
  const mergeData = {
    ...data
  }
  // 登陆接口
  if (bizType === 'userInfo') {
    mergeData['appid'] = APP_ID
  } else {
    // 非登陆接口
    mergeData['userToken'] = getUserTokenCacheSync() || ''
  }
  const encryptedParams = encryptedDes(mergeData) // encryptedDes
  const signature = encryptedRsa(encryptedParams)
  const config = {
    ...options
  }
  delete config['bizType']
  delete config['url']
  delete config['data']
  const setting = {
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    ...config,
    data: {
      data: encryptedParams,
      bizType,
      signature
    },
    url: `${BASE_API}${url}`,
  }

  console.log(`解密加密后传的参数`, dencryptedDes(encryptedParams))

  const { data: body } = await Taro.request(setting)
  if (body.retCode === 'C0000' && body.data) {
    const result = dencryptedDes(body.data)
    console.log('解密后的响应数据', result)
    return JSON.parse(result)
  } else {
    throw new ApiServiceError({}, body.retMsg, body.retCode)
    // return {}
  }
}

/**
 * GET请求
 */
const apiGet = (...args) => {
  return request({
    method: 'GET',
    ...args
  })
}

/**
 * POST请求
 */
const apiPost = (options) => {
  return request({
    method: 'POST',
    ...options
  })
}

/**
 * PUT请求
 */
const apiPut = (...args) => {
  return request({
    method: 'PUT',
    ...args
  })
}

/**
 * DELETE请求
 */
const apiDelete = (...args) => {
  return request({
    method: 'DELETE',
    ...args
  })
}

class APIInterceptorError extends Error {
  constructor(config, message, code = 666) {
      super(message);
      this.name = 'APIInterceptorError';
      this.code = code;
      this.config = config;
  }
}

class ApiServiceError extends APIInterceptorError {
  constructor(config, message, code) {
      super(config, message, code);
      this.name = 'ApiServiceError';
      this.message = message;
  }
}

export { apiGet, apiPost, apiPut, apiDelete }

export default request