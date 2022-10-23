/* eslint-disable import/first */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { chunk } from '../../shared/array'
import BaseButton from '../../components/Button'

import './index.scss'
import { handleNavigateTo } from '../../shared/navigator'


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
      dineNumber: 1
    }

    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleNumberChange (v) {
    // if (v === 10) {}
    this.setState({
      dineNumber: v
    })
  }

  handleSubmit () {
    handleNavigateTo({
      path: '/pages/store/index'
    })
  }

  render () {
    const { dineNumber } = this.state
    return (
      <View className='page-container index-page'>
        <View className='container'>
          <View className='header'>
            <View className='welcome'>
              <Text>欢迎来到</Text>
            </View>
            <View className='name'>
              <Text>这个店铺</Text>
            </View>
          </View>
          <View className='body'>
            <View className='title'>
              <View className='regards'>
                <Text>您好，请选择就餐人数</Text>
              </View>
              <View className='desk'>
                <Text>桌号B10</Text>
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
                            'number--item-active': dineNumber === item.value
                          }
                          return (
                            <View
                              className={classNames(rootClassName, classObject)}
                              key={item.value}
                              onClick={(e) => {
                                this.handleNumberChange(item.value)
                                e.preventDefault();
                                e.stopPropagation();
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
              <BaseButton full circle onClick={this.handleSubmit.bind(this)}>
                <Text>开始点餐</Text>
              </BaseButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default IndexPage
