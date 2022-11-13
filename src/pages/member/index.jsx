import { Component } from 'react'
import { View, Text, Input, Picker } from '@tarojs/components'

import BaseRadio from '../../components/Radio'
import Drawer from '../../components/Drawer'
import BasePicker from '../../components/Picker'
import { createMember, requestArea, requestMember } from '../../service/user'
import BaseButton from '../../components/Button'

import './index.scss'

const sexOptions = [{
  label: '男',
  value: 'MAN'
}, {
  label: '女',
  value: 'WOMAN'
}, {
  label: '未知',
  value: 'NON'
}]

const areaLabelMap = {
  province: {
    label: 'provinceName',
    value: 'provinceCode'
  },
  city: {
    label: 'cityName',
    value: 'cityCode'
  },
  county: {
    label: 'countyName',
    value: 'countyCode'
  }
}
class MemberPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userSexType: 'MAN',
      birthDate: '',
      phone: '',
      drawerVisible: false,
      areaSourceList: [],
      areaSelectedIdx: 0,
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      provinceTarget: {},
      cityTarget: {},
      countyTarget: {},
      fetchType: '', // province|city|county
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.handleShowSelectArea = this.handleShowSelectArea.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleFetchArea = this.handleFetchArea.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.handleFetchData()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleFetchData () {
    requestMember()
      .then(res => {
        console.log(res)
      })
  }

  handleChange(type, event) {
    this.setState({
      [type]: event.detail.value
    })
  }

  handleDateChange(e) {
    this.setState({
      birthDate: e.detail.value
    })
  }

  handleCloseDrawer () {
    this.setState({
      drawerVisible: false
    })
  }

  handleConfirm (idx) {
    const { areaSourceList, fetchType } = this.state
    const target = areaSourceList[idx]
    const targetMap = {
      province: 'provinceTarget',
      city: 'cityTarget',
      county: 'countyTarget'
    }

    const targetKey = targetMap[fetchType]
    const codeMap = {
      province: 'provinceCode',
      city: 'cityCode',
      county: 'countyCode'
    }
    const codeKey = codeMap[fetchType]
    this.setState({
      [targetKey]: target,
      [codeKey]: target[codeKey],
      areaSelectedIdx: idx
    }, () => {
      this.handleCloseDrawer()
    })
  }

  handleShowSelectArea (type) {
    if (type === 'city') {
      if (!this.state.provinceCode) return
    }
    if (type === 'county') {
      if (!this.state.cityCode) return
    }
    this.setState({
      fetchType: type
    }, () => {
      this.handleFetchArea()
    })
  }

  handleFetchArea() {
    const { provinceCode, cityCode, fetchType } = this.state
    const dic = {
      province: 1,
      city: 1,
      county: 2
    }
    const type = dic[fetchType]
    const params = {
      type
    }
    if (fetchType === 'city') {
      params['code'] = provinceCode
    }
    if (fetchType === 'county') {
      params['code'] = cityCode
    }
    requestArea(params)
      .then(res => {
        this.setState({
          areaSourceList: res.listData || [],
          drawerVisible: true
        })
      })
  }

  handleSubmit () {
    const {
      userName,
      birthDate,
      realAddress,
      userSexType,
      countyCode,
      phone
    } = this.state
    const params = {
      userName,
      birthDate,
      realAddress,
      userSexType,
      phone,
      regionCode: countyCode
    }
    createMember(params)
      .then(res => {
        console.log('res', res)
      })
  }

  render() {
    const {
      userName,
      phone,
      userSexType,
      birthDate,
      realAddress,
      drawerVisible,
      areaSourceList,
      areaSelectedIdx,
      fetchType,
      provinceTarget,
      cityTarget,
      countyTarget
    } = this.state
    const labelName = areaLabelMap[fetchType]?.label ?? 'label'
    const valueName = areaLabelMap[fetchType]?.value ?? 'value'
    return (
      <View className='page-container member-page'>
        <View className='form-panel'>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>真实姓名</Text></View>
            <View className='value'>
              <Input
                className='input'
                type='text'
                placeholder='请输入姓名'
                value={userName}
                onInput={(e) => this.handleChange('userName', e)}
              />
            </View>
          </View>

          <View className='item'>
            <View className='label'><Text className='txt-h3'>手机号码</Text></View>
            <View className='value'>
              <Input
                className='input'
                type='text'
                placeholder='请输入手机号'
                value={phone}
                onInput={(e) => this.handleChange('phone', e)}
              />
            </View>
          </View>

          <View className='item'>
            <View className='label'><Text className='txt-h3'>性别</Text></View>
            <View className='value'>
              <BaseRadio
                options={sexOptions}
                checked={userSexType}
              />
            </View>
          </View>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>生日</Text></View>
            <View className='value'>
              <Picker mode='date' value={birthDate} onChange={this.handleDateChange}>
                <View className='picker'>
                  <Text className='txt-h3'>{birthDate ? birthDate : '请选择出生日期'}</Text>
                </View>
              </Picker>
            </View>
          </View>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>省份</Text></View>
            <View className='value' onClick={() => this.handleShowSelectArea('province')}>
              <Text className='txt-h3'>{provinceTarget?.provinceName ?? '请选择省份'}</Text>
            </View>
          </View>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>城市</Text></View>
            <View className='value' onClick={() => this.handleShowSelectArea('city')}>
              <Text className='txt-h3'>{cityTarget?.cityName ?? '请选择城市'}</Text>
            </View>
          </View>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>县/区</Text></View>
            <View className='value' onClick={() => this.handleShowSelectArea('county')}>
              <Text className='txt-h3'>{countyTarget?.countyName ?? '请选择县/区'}</Text>
            </View>
          </View>
          <View className='item'>
            <View className='label'><Text className='txt-h3'>门牌号</Text></View>
            <View className='value'>
              <Input
                className='input'
                type='text'
                placeholder='请输入街道门牌号'
                value={realAddress}
                onInput={(e) => this.handleChange('realAddress', e)}
              />
            </View>
          </View>
        </View>
        <BaseButton full circle onClick={this.handleSubmit}>
          <Text>加入会员</Text>
        </BaseButton>
        <Drawer
          show={drawerVisible}
          onClose={this.handleCloseDrawer}
          direction='bottom'
        >
          <BasePicker
            onCancel={this.handleCloseDrawer}
            onConfirm={this.handleConfirm}
            sourceList={areaSourceList}
            selected={areaSelectedIdx}
            labelName={labelName}
            valueName={valueName}
          />
        </Drawer>
      </View>
    )
  }
}

export default MemberPage

