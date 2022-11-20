import { Component } from 'react'

import { View, Text } from '@tarojs/components'


import Header from './Header'
import Content from './Content'
import Action from './Action'

import './style.scss'

class Dialog extends Component {
  static defaultProps = {
    closeOverLay: true
  }

  constructor(props) {
    super(props)
    const { opened } = props
    this.state = {
      isOpened: opened
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOverLay = this.handleClickOverLay.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { opened } = nextProps
    if (this.props.opened !== opened) {

    }
    if (opened !== this.state.isOpened) {
      this.setState({
        isOpened: opened
      })
    }
  }

  handleTouchScroll() {

  }

  /**
   * 点击弹层
   */
  handleClickOverLay() {
    if (this.props.closeOverLay) {
      this.setState({
        isOpened: false
      }, this.handleCancel)
    }
  }

  /**
   * 关闭回调
   */
  handleClose() {
    this.props.onClose && this.props.onClose()
  }

  /**
   * 取消按钮回调
   */
  handleCancel() {
    this.props.onCancel && this.props.onCancel()
  }

  handleConfirm() {
    this.props.onConfirm && this.props.onConfirm()
  }

  render() {
    const { isOpened } = this.state
    const { title, content, cancelText, confirmText, center = false } = this.props
    const rootClass = isOpened ? 'base-dialog base-dialog-opened' : `base-dialog`
    const isRenderAction = cancelText || confirmText
    if (title && content) {
      return (
        <View
          className={rootClass}
        >
          <View className='base-dialog-overlay' onClick={this.handleClickOverLay}></View>
          <View className='base-dialog-content'>
            <View className='base-dialog-header'>
              <Header>
                <Text>{title}</Text>
              </Header>
            </View>
            <View className='base-dialog-body'>
              <Content center={center}>
                <Text>{content}</Text>
              </Content>
            </View>
            {
              isRenderAction && (
                <View className='base-dialog-footer'>
                  <Action>
                    {cancelText && (
                      <View className='btn btn-cancel' onClick={this.handleCancel}>
                        <Text>{cancelText}</Text>
                      </View>
                    )}
                    {confirmText && (
                      <View className='btn btn-confirm' onClick={this.handleConfirm}>
                        <Text>{confirmText}</Text>
                      </View>
                    )}
                  </Action>
                </View>
              )
            }
          </View>
        </View>
      )
    }
    return (
      <View
        className={rootClass}
      >
        <View className='base-dialog-overlay' onClick={this.handleClickOverLay}></View>
        <View className='base-dialog-content'>
          <View className='base-dialog--main'>{this.props.children}</View>
          {
            isRenderAction && (
              <View className='base-dialog-footer'>
                <Action>
                  {cancelText && (
                    <View className='btn btn-cancel' onClick={this.handleCancel}>
                      <Text>{cancelText}</Text>
                    </View>
                  )}
                  {confirmText && (
                    <View className='btn btn-confirm' onClick={this.handleConfirm}>
                      <Text>{confirmText}</Text>
                    </View>
                  )}
                </Action>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default Dialog
