import { Component } from 'react'

import classNames from 'classnames'

import { View, Text } from '@tarojs/components'

import { isFunction } from '../../shared/type'

import './style.scss'

class BaseRadio extends Component {
  static defaultProps = {
    options: [],
    checked: '',
    customStyle: '',
    className: '',
    labelName: 'label',
    valueName: 'value'
  }

  constructor(props) {
    super(props)
    this.state = {
      _checked: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return {_checked: props.checked };
  }

  componentWillReceiveProps (nextProps) {
    const { checked, options } = nextProps
    if (!options?.length) return
    if (checked !== this.state._checked) {
      this.setState({
        _checked: checked
      })
    }
  }

  /**
   * 点击筛选
   * @param {*} option 选项
   * @returns 回调函数
   */
  handleClick (option, e) {
    const { disabled } = option
    const { valueName } = this.props
    if (disabled) return

    if (isFunction(this.props.onChange)) {
      this.props.onChange(option[valueName], e)
    }
  }

  render () {
    const { className, customStyle, options, labelName, valueName } = this.props
    const { _checked } = this.state
    const rootClass = classNames('base-radio', className)
    return (
      <View className={rootClass} style={customStyle}>
        {
          options.map((option) => {
            const { disabled } = option
            const optionClass = classNames({
              'base-radio__option': true,
              'base-radio__option--disabled': disabled,
              'base-radio__option--checked': _checked === '' + option[valueName]
            })

            return (
              <View className={optionClass}
                key={option[valueName]}
                onClick={(e) => this.handleClick(option, e)}
              >
                <Text>{option[labelName]}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default BaseRadio