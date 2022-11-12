import { Component } from "react"
import { View } from '@tarojs/components'
import Header from "./header"
import Footer from "./footer"
import Content from "./content"

class Board extends Component {
  render() {
    const {
      data,
      sizeChecked = '',
      measureChecked = '',
      flavorChecked = '',
      consumeChecked = '',
      productNumber,
      totalPrice = 0,
      currentProduct = {}
    } = this.props
    return (
      <View className='board-container'>
        <Header data={currentProduct} />
        <Content
          specVoMap={data.specVoMap}
          consumeCate={data.consumeCate}
          materials={data.materials}
          sizeChecked={sizeChecked}
          measureChecked={measureChecked}
          flavorChecked={flavorChecked}
          consumeChecked={consumeChecked}
          onUpdateVo={this.props.onUpdateVo}
          onChangeVo={this.props.onChangeVo}
        />
        <Footer
          data={{
            productNumber,
            totalPrice
          }}
          onAddCart={this.props.onAddCart}
          onCounter={this.props.onCounter}
        />
      </View>
    )
  }
}

export default Board