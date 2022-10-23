import { Component } from "react"
import { View, ScrollView } from '@tarojs/components'

import Item from "../Item"

class Content extends Component {
  constructor(props) {
    super(props)
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
  }
  timer = null
  handleScrollToLower() { }
  handleOnScroll(e) {
    const timeoutTask = callback => () => {
      callback.call(this, e);
    }

    // 节流方法
    const throttleMethod = requestAnimationFrame
      ? callback => requestAnimationFrame(timeoutTask(callback))
      : callback => setTimeout(timeoutTask(callback), 16.67);
    // const throttleMethod = (callback) => {
    //   if (this.timer) {
    //     clearTimeout(this.timer)
    //   }
    //   return this.timer = setTimeout(timeoutTask(callback), 300)
    // }
    throttleMethod(this.handleScrollCallback)
  }

  handleScrollCallback(e) {
    let show = false
    if (e.detail.scrollTop > 80) {
      // 显示搜索框
      show = true
    } else {
      // 隐藏搜索框
      show = false
    }
    this.props.onScroll({
      show
    })
  }

  handleOnPress (e, data) {
    this.props.onSelect(data)
  }

  render() {
    const { sourceData = [], threshold = 100 } = this.props
    return (
      <ScrollView
        className='content-container'
        scrollY
        scrollWithAnimation
        lowerThreshold={threshold}
        onScrollToLower={this.handleScrollToLower}
        onScroll={this.handleOnScroll}
      >
        {
          sourceData.map(item => {
            return (
              <View key={item.id} className='content-item'>
                <Item
                  data={item}
                  onPress={this.handleOnPress}
                />
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

export default Content