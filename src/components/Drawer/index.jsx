import { Component } from 'react'

import classNames from 'classnames'

import { View } from '@tarojs/components'

import './style.scss'

// 抽屉方向
const directionMap = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
}

class Drawer extends Component {
  static defaultProps = {
    mask: true,
    show: false,
    width: '',
    direction: 'bottom'
  }

  constructor(props) {
    super(props)
    this.state = {
      delay: false,
      _show: false
    }
    this.handleDelayShow = this.handleDelayShow.bind(this)
    this.handleDelayHide = this.handleDelayHide.bind(this)
    this.onHide = this.onHide.bind(this)
    this.handleClickOverLay = this.handleClickOverLay.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return {_show: props.show };
  }

  componentWillReceiveProps (nextProps) {
    const { show } = nextProps
    if (show !== this.state._show) {
      show ? this.handleDelayShow() : this.handleDelayHide()
    }
  }

  // 延时展示
  handleDelayShow () {
    this.setState({
      _show: true
    })
    setTimeout(() => {
      this.setState({
        delay: true
      })
    }, 200)
  }

  /**
   * 延时关闭
   */
  handleDelayHide () {
    this.setState({
      delay: false
    })
    setTimeout(() => {
      this.onHide()
    }, 300)
  }

  /**
   * 关闭回调
   */
  onHide () {
    this.setState({
      _show: false
    }, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  /**
   * 蒙版点击
   */
  handleClickOverLay () {
    this.handleDelayHide()
  }

  render () {
    const { mask, width, direction } = this.props
    const { delay, _show } = this.state

    const rootClassName = 'base-drawer'
    const position = directionMap[direction] || directionMap['bottom']
    const classObject = {
      'base-drawer-show': mask,
      [`base-drawer-${position}`]: position,
      'base-drawer-opened': _show
    }

    const maskStyle = {
      display: mask ? 'block' : 'none',
      opacity: delay ? 1 : 0
    }

    const contentStyle = {
      width,
      transition: delay ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }

    return (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
      >
        <View
          className='base-drawer-overlay'
          style={maskStyle}
          onClick={this.handleClickOverLay}
        ></View>
        <View
          className='base-drawer-content'
          style={contentStyle}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default Drawer