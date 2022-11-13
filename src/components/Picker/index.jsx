import { Component } from 'react'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import { isFunction } from '../../shared/type'

import './style.scss'

class BasePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: [0]
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.onChange = this.onChange.bind(this)
    this.initSelected = this.initSelected.bind(this)
  }

  componentDidMount () {
    this.initSelected()
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps
    if (Number(selected) !== this.state.value[0]) {
      this.setState({
        value: [Number(selected)]
      })
    }
  }

  initSelected () {
    const { selected = 0 } = this.props
    this.setState({
      value: [selected]
    })
  }

  handleCancel () {
    const { onCancel } = this.props
    if (isFunction(onCancel)) {
      onCancel()
    }
  }

  handleConfirm () {
    const { onConfirm } = this.props
    const { value } = this.state
    if (isFunction(onConfirm)) {
      onConfirm(value[0])
    }
  }

  onChange (e) {
    const currentValue = e.detail.value
    this.setState({
      value: currentValue
    })
  }

  render () {
    const { sourceList, labelName, valueName } = this.props
    const pickerStyle = {
      width: '100%',
      height: '300px'
    }
    return (
      <View className='picker-container'>
        <View className='picker-container__header'>
          <View className='cancel' onClick={this.handleCancel}>取消</View>
          <View className='confirm' onClick={this.handleConfirm}>确定</View>
        </View>
        <PickerView
          className='picker-container__view'
          indicatorStyle='height: 40px;'
          indicatorClass='picker-indicator'
          style={pickerStyle}
          onChange={this.onChange}
          value={this.state.value}
        >
          <PickerViewColumn className='picker-container__view-item'>
            {
              sourceList.map(item => {
                return (
                  <View className='picker-text' key={item[valueName]}>{item[labelName]}</View>
                )
              })
            }
          </PickerViewColumn>
        </PickerView>
      </View>
    )
  }
}

export default BasePicker
