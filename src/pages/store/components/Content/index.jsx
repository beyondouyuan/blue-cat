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
    // const timeoutTask = callback => () => {
    //   callback.call(this, e);
    // }

    // // 节流方法
    // const throttleMethod = requestAnimationFrame
    //   ? callback => requestAnimationFrame(timeoutTask(callback))
    //   : callback => setTimeout(timeoutTask(callback), 16.67);
    // // const throttleMethod = (callback) => {
    // //   if (this.timer) {
    // //     clearTimeout(this.timer)
    // //   }
    // //   return this.timer = setTimeout(timeoutTask(callback), 300)
    // // }
    // throttleMethod(this.handleScrollCallback)
    this.handleScrollCallback(e)
  }

  handleScrollCallback(e) {
    let show = false
    if (e.detail.scrollTop > 120) {
      // 显示搜索框
      show = true
    } else {
      // 隐藏搜索框
      show = false
    }
    this.props.onScroll({
      show,
      event: e
    })
  }

  handleOnPress (e, data) {
    this.props.onSelect(data)
  }

  render() {
    const { sourceData = [], threshold = 100, scrollRef, currentIntoView } = this.props
    return (
      <ScrollView
        ref={scrollRef}
        id={scrollRef}
        className='content-container'
        scrollY
        scrollWithAnimation
        scrollAnchoring
        fastDeceleration
        lowerThreshold={threshold}
        onScrollToLower={this.handleScrollToLower}
        onScroll={this.handleOnScroll}
        scrollIntoView={`${scrollRef}-${currentIntoView}`}
      >
        {
          sourceData.length ? sourceData.map(item => {
            const { list = [] } = item
            return (
              <View
                key={item.value}
                className='content-wrapper'
                ref={`${scrollRef}-${item.value}`}
                id={`${scrollRef}-${item.value}`}
              >
                {
                  list.length ? list.map(child => {
                    return (
                      <View
                        key={child.merchantproductId}
                        className='content-item'
                      >
                        <Item
                          data={child}
                          onPress={this.handleOnPress}
                        />
                      </View>
                    )
                  }) : null
                }
              </View>
            )
          }) : null
        }
      </ScrollView>
    )
  }
}

export default Content