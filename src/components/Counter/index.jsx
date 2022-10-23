import { Component } from 'react'
import { View, Text } from '@tarojs/components'

import './style.scss'
import { isFunction } from '../../shared/type'

class BaseCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _counter: 0
    }
  }
  componentDidMount () {
    const { counter } = this.props
    this.setState({
      _counter: +counter
    })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { counter } = nextProps
    if (counter !== this.state._counter) {
      this.setState({
        _counter: +counter
      })
    }
  }
  handleClick (e, type) {
    const { _counter } = this.state
    const { limit = 0 } = this.props
    if (_counter <= limit && type === 'minus') return

    let counter = 0
    if (type === 'minus') {
      counter = _counter - 1
    } else {
      counter = _counter + 1
    }

    this.setState({
      _counter: counter
    }, () => {
      if (isFunction(this.props.onCounter)) {
        this.props.onCounter({
          counter,
          type
        })
      }
    })
  }
  render() {
    const { _counter } = this.state
    return (
      <View className='base-counter'>
        {
          _counter ? (
            <View
              className='base-counter--action minus'
              onClick={(e) => {
                this.handleClick(e, 'minus')
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Text>-</Text>
            </View>
          ) : null
        }
        {
          this.props.children ? (
            <View className='base-counter--label'>
              {this.props.children}
            </View>
          ) : (
            <View className='base-counter--label counter'>
              {_counter}
            </View>
          )
        }
        <View
          className='base-counter--action add'
          onClick={(e) => {
            this.handleClick(e, 'add')
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Text>+</Text>
        </View>
      </View>
    )
  }
}


export default BaseCounter