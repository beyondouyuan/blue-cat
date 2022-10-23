import { Component } from 'react'

import classNames from 'classnames'

import { View } from '@tarojs/components'

import './style.scss'

const sizeMap = {
  normal: 'normal',
  small: 'small',
  middle: 'middle'
}

const typeMap = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info'
}


class BaseButton extends Component {
  static defaultProps = {
    customStyle: {},
    className: '',
    size: 'normal',
    type: 'primary',
    full: false,
    circle: false,
    loading: false,
    disabled: false
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  /**
   * 点击回调
   * @param {*} e 事件
   * @returns 回调函数
   */
  handleClick (e) {
    if (this.props.disabled) return
    this.props.onClick && this.props.onClick(e)
  }

  render () {
    const {
      size,
      type,
      circle,
      full,
      disabled,
      customStyle
    } = this.props
    const rootClass = ['base-button']
    const classObject = {
      [`base-button--${sizeMap[size]}`]: sizeMap[size],
      'base-button--disabled': disabled,
      [`base-button--${typeMap[type]}`]: typeMap[type],
      'base-button--circle': circle,
      'base-button--full': full,
    }
    return (
      <View
        className={classNames(rootClass, classObject, this.props.className)}
        style={customStyle}
        onClick={(e) => {
          this.handleClick(e)
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <View className='base-button__text'>{this.props.children}</View>
      </View>
    )
  }
}

export default BaseButton
