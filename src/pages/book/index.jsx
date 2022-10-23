import { Component } from 'react'
import { View } from '@tarojs/components'
import Content from './components/Content'
import Submit from './components/Submit'

import { handleNavigateTo } from '../../shared/navigator'

import food from '../../images/food.jpeg'

import './index.scss'
import { hideLoading, showLoading } from '../../shared/loading'

const sourceData = [{
  id: 1,
  title: '五谷渔粉',
  desc: '中份,堂食',
  number: 1,
  price: 13,
  url: food
}]

class BookPage extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handlePress () {
    handleNavigateTo({
      path: '/pages/store/index'
    })
  }

  handleSubmit () {
    showLoading({
      title: '唤起支付...'
    })

    setTimeout(() => {
      hideLoading()
    }, 1000)
  }

  render () {
    return (
      <View className='page-container book-page'>
        <Content
          list={sourceData}
        />
        <Submit
          onPress={this.handlePress}
          onSubmit={this.handleSubmit}
        />
      </View>
    )
  }
}

export default BookPage

