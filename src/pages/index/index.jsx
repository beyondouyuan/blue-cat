import { Component } from 'react'
import { View, Text, Input } from '@tarojs/components'
import classNames from 'classnames'
import { chunk } from '../../shared/array'
import BaseButton from '../../components/Button'
import Dialog from '../../components/Dialog'

import './index.scss'
import { handleNavigateTo } from '../../shared/navigator'
import { getToken, requestUserLogin } from '../../shared/login'
import { setMerchantCacheSync } from '../../shared/global'
import { requestMerchantTable } from '../../service/store'
import events from '../../shared/event'


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
      disabled: true,
      loading: false,
      inputPeopleNum: '',
      dialogVisible: false
    }

    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleChangePeopleNum = this.handleChangePeopleNum.bind(this)
  }
  componentDidMount () {
    this.handleLogin()
    this.handleFetchData()
    events.on('onloginSuccess', this.handleFetchData)
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async handleLogin() {
    await requestUserLogin()
    this.handleFetchData()
  }

  async handleFetchData() {
    const token = getToken()
    if (!token) return
    const { loading } = this.state
    if (loading) return
    this.setState({
      loading: true
    })
    try {
      const { tableId } = this.state
      const params = {
        tableId: tableId
      }
      const storeInfo = await requestMerchantTable(params)
      this.setState({
        storeInfo,
        disabled: false,
        loading: false
      })
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }

  handleNumberChange (v) {
    if (v === 10) {
      this.handleShowDialog()
      this.setState({
        peopleNum: v
      })
      return
    }
    this.setState({
      peopleNum: v,
      inputPeopleNum: ''
    })
  }

  handleShowDialog () {
    this.setState({
      dialogVisible: true
    })
  }

  handleSubmit () {
    const { tableId, peopleNum, storeInfo, inputPeopleNum } = this.state
    const finalNum = inputPeopleNum || peopleNum
    setMerchantCacheSync({
      ...storeInfo,
      peopleNum: finalNum
    })
    handleNavigateTo({
      path: '/pages/store/index',
      params: {
        tableId,
        peopleNum: finalNum,
        tableName: storeInfo.tableNane,
        merchantNum: storeInfo.merchantNum,
        payTag: storeInfo.payTag
      }
    })
  }

  handleConfirm () {
    this.setState({
      dialogVisible: false
    })
    if (!this.state.inputPeopleNum) {
      this.setState({
        peopleNum: 1
      })
    }
  }

  handleCancel () {
    this.setState({
      dialogVisible: false,
      inputPeopleNum: '',
      peopleNum: 1
    })
  }

  handleChangePeopleNum(event) {
    this.setState({
      inputPeopleNum: +event.detail.value
    })
  }

  render () {
    const { inputPeopleNum, peopleNum, disabled, storeInfo, dialogVisible } = this.state
    return (
      <View className='page-container index-page'>
        <View className='container'>
          <View className='header'>
            <View className='welcome'>
              <Text>欢迎光临</Text>
            </View>
            <View className='name'>
              <Text>{storeInfo?.address ?? ''}</Text>
            </View>
          </View>
          <View className='body'>
            <View className='title'>
              <View className='regards'>
                <Text>您好，请选择就餐人数</Text>
              </View>
              <View className='desk'>
                <Text>{storeInfo?.tableNane ? `桌号${storeInfo.tableNane}` : ''}</Text>
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
                                e.preventDefault()
                                e.stopPropagation()
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
        <Dialog
          opened={dialogVisible}
          confirmText='确定'
          cancelText='取消'
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        >
          <View className='form'>
            <View className='form-item'>
              <Input
                className='input'
                type='text'
                placeholder='请输入就餐人数'
                value={inputPeopleNum}
                onInput={this.handleChangePeopleNum}
              />
            </View>
          </View>
        </Dialog>
      </View>
    )
  }
}

export default IndexPage

