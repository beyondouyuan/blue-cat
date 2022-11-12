import { Component } from 'react'

import { Button } from '@tarojs/components'
import classNames from 'classnames'

import { isFunction } from '../../shared/type'

import './style.scss'

const sizeMap = {
  normal: 'normal',
  small: 'small',
  middle: 'middle',
  mini: 'mini'
}

const typeMap = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info'
}

class MButton extends Component {
  constructor(props) {
    super(props)
    this.handleGetPhone = this.handleGetPhone.bind(this)
  }
  handleGetPhone (e) {
    const { onGetAuthor } = this.props
    if (e.detail.encryptedData) {
      // 接收授权
      if (isFunction(onGetAuthor)) {
        onGetAuthor({ type: 'phone', detail: e.detail, status: 'success' })
      }
    } else {
      // 拒绝授权
      if (isFunction(onGetAuthor)) {
        onGetAuthor({ type: 'phone', detail: e.detail, status: 'reject' })
      }
    }
  }
  render () {
    const {
      text,
      buttonProps = {}
    } = this.props
    const {
      size,
      disabled,
      type,
      circle,
      full
    } = buttonProps
    const rootClass = ['base-button']
    const classObject = {
      [`base-button--${sizeMap[size]}`]: sizeMap[size],
      'base-button--disabled': disabled,
      [`base-button--${typeMap[type]}`]: typeMap[type],
      'base-button--circle': circle,
      'base-button--full': full,
    }
    return (
      <Button
        className={classNames(rootClass, classObject, this.props.className)}
        {...buttonProps}
        onGetPhoneNumber={this.handleGetPhone}
      >
        {text}
      </Button>
    )
  }
}

export default MButton
