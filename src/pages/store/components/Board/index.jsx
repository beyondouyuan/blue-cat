import { Component } from "react"
import { View } from '@tarojs/components'
import Header from "./header"
import Footer from "./footer"
import Content from "./content"

class Board extends Component {
  render () {
    const { data } = this.props
    return (
      <View className='board-container'>
        <Header data={data} />
          <Content
            size={data.size}
            cate={data.cate}
            materials={data.materials}
          />
        <Footer data={data} />
      </View>
    )
  }
}

export default Board