import Taro from '@tarojs/taro'
import { requestLogin } from '../service/user'
import { setCacheSync, getCacheSync, removeCacheSync } from './storage'
import { setUserInfoCacheSync } from './user'

const LOCAL_CODE = 'LOCAL_CODE'
const LOCAL_USER_TOKEN = 'LOCAL_USER_TOKEN'

// 检查登录是否过期
export async function checkSession() {
  return new Promise((resolve) => {
    Taro.checkSession({
      success: () => resolve(true),
      fail: () => resolve(false)
    })
  })
}

export async function getCode () {
  const localCode = getCacheSync(LOCAL_CODE)
  if (localCode) {
    const bool = await checkSession()
    if (bool) {
      return localCode
    } else {
      removeCode()
    }
  }

  try {
    const res = await Taro.login()
    const code = res.code
    if (!code) { throw new Error('解析code失败') }
    setCacheSync(LOCAL_CODE, code)
    return code
  } catch (error) {
    return null
  }
}

export function removeCode() {
  return removeCacheSync(LOCAL_CODE)
}

function getSetting() {
  return new Promise((resolve, rejetc) => {
    Taro.getSetting({
      success: (response) => {
        if (!response.authSetting['scope.userInfo']) {
          rejetc()
        } else {
          resolve(response)
        }
      },
      fail: () => {
        rejetc()
      }
    })
  })
}
async function getUserInfoAuthorize () {
  return new Promise((resolve, rejetc) => {
    Taro.authorize({
      scope: 'scope.userInfo',
      success: (res) => {
        resolve(res)
      },
      fail: () => {
        rejetc()
      }
    })
  })
}

export async function getAuthorize () {
  try {
    const check = await getSetting()
    if (!check) {
      return await getUserInfoAuthorize()
    } else {
      return check
    }
  } catch (error) {
    return await getUserInfoAuthorize()
  }
}

/**
 * 获取用户信息
 */
export async function getUserInfo () {
  const result = await Taro.getUserInfo()
  return result
}

export function getToken () {
  return getCacheSync(LOCAL_USER_TOKEN)
}

export function setToken (v) {
  setCacheSync(LOCAL_USER_TOKEN, v)
}

export function removeToken () {
  return removeCacheSync(LOCAL_USER_TOKEN)
}

export async function requestUserLogin () {
  const token = getToken()
    if (token) {
      return new Promise((resolve) => resolve())
    }
    const code = await getCode()
    await getAuthorize()
    const userResult = await getUserInfo()
    const {
      cloudID,
      encryptedData,
      iv,
      rawData,
      signature,
      userInfo
    } = userResult
    const params = {
      cloudID,
      encryptedData,
      iv,
      rawData: JSON.parse(rawData),
      signature,
      code,
      userInfo
    }

    return requestLogin(params)
      .then(res => {
        const { avatarUrl, nickName, userToken } = res
        const userInfoData = {
          nickName,
          avatarUrl
        }
        setUserInfoCacheSync(userInfoData)
        setToken(userToken)
      })
      .catch(e => {
        console.log('e', e.code)
      })
}