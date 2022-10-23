import { Component } from 'react'

import classNames from 'classnames'

import { View, Text } from '@tarojs/components'

import './style.scss'

class BaseRadio extends Component {
  static defaultProps = {
    options: [],
    checked: '',
    customStyle: '',
    className: ''
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * 点击筛选
   * @param {*} option 选项
   * @returns 回调函数
   */
  handleClick (option, e) {
    const { disabled, value } = option
    if (disabled) return

    this.props.onChange(value, e)
  }

  render () {
    const { className, customStyle, options, checked } = this.props
    const rootClass = classNames('base-radio', className)
    return (
      <View className={rootClass} style={customStyle}>
        {
          options.map((option) => {
            const { value, disabled, label } = option
            const optionClass = classNames({
              'base-radio__option': true,
              'base-radio__option--disabled': disabled,
              'base-radio__option--checked': checked === value
            })

            return (
              <View className={optionClass}
                key={value}
                onClick={(e) => this.handleClick(option, e)}
              >
                <Text>{label}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default BaseRadio