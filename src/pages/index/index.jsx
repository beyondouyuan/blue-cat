import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { chunk } from '../../shared/array'
import BaseButton from '../../components/Button'

import './index.scss'
import { handleNavigateTo } from '../../shared/navigator'
import { getAuthorize, getCode, getUserInfo } from '../../shared/login'
import { requestLogin } from '../../service/user'
import { getUserTokenCacheSync, setUserInfoCacheSync, setUserTokenCacheSync } from '../../shared/user'
import { setMerchantCacheSync } from '../../shared/global'
import { requestMerchantTable } from '../../service/store'


const dines = Array.from(new Array(10), (val, index) => {
  return {
    label: index + 1 === 10 ? '其他' : index + 1,
    value: index + 1
  }
})

const groupDines = chunk(dines, 5)

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peopleNum: 1,
      tableId: '7',
      storeInfo: {},
      disabled: true
    }

    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
  }
  componentDidMount () {
    this.handleLogin()
    this.handleFetchData()
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async handleLogin() {
    const token = getUserTokenCacheSync()
    if (token) return
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
    requestLogin(params)
      .then(res => {
        const { avatarUrl, nickName, userToken } = res
        const userInfoData = {
          nickName,
          avatarUrl
        }
        setUserInfoCacheSync(userInfoData)
        setUserTokenCacheSync(userToken)
        this.handleFetchData()
      })
      .catch(e => {
        console.log('e', e.code)
      })
  }

  async handleFetchData() {
    const token = getUserTokenCacheSync()
    if (!token) return
    try {
      const { tableId } = this.state
      const params = {
        tableId: tableId
      }
      const storeInfo = await requestMerchantTable(params)
      this.setState({
        storeInfo,
        disabled: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleNumberChange (v) {
    // if (v === 10) {}
    this.setState({
      peopleNum: v
    })
  }

  handleSubmit () {
    const { tableId, peopleNum, storeInfo } = this.state
    setMerchantCacheSync({
      ...storeInfo,
      peopleNum,
      peoplePrice: 1
    })
    handleNavigateTo({
      path: '/pages/store/index',
      params: {
        tableId,
        peopleNum,
        tableName: storeInfo.tableNane,
        merchantNum: storeInfo.merchantNum,
        peoplePrice: 1,
        payTag: storeInfo.payTag
      }
    })
  }

  render () {
    const { peopleNum, disabled } = this.state
    return (
      <View className='page-container index-page'>
        <View className='container'>
          <View className='header'>
            <View className='welcome'>
              <Text>欢迎来到</Text>
            </View>
            <View className='name'>
              <Text>这个店铺</Text>
            </View>
          </View>
          <View className='body'>
            <View className='title'>
              <View className='regards'>
                <Text>您好，请选择就餐人数</Text>
              </View>
              <View className='desk'>
                <Text>桌号B10</Text>
              </View>
            </View>

            <View className='select'>
              {
                groupDines.map((group, idx) => {
                  return (
                    <View className='number' key={idx}>
                      {
                        group.map(item => {
                          const rootClassName = 'number--item'
                          const classObject = {
                            'number--item-active': peopleNum === item.value
                          }
                          return (
                            <View
                              className={classNames(rootClassName, classObject)}
                              key={item.value}
                              onClick={(e) => {
                                this.handleNumberChange(item.value)
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Text>{item.label}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
            <View className='submit'>
              <BaseButton full circle disabled={disabled} onClick={this.handleSubmit.bind(this)}>
                <Text>开始点餐</Text>
              </BaseButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default IndexPage

