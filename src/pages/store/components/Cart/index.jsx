import { Component } from "react"
import { View, Text } from '@tarojs/components'
import Item from "./Item"

class Cart extends Component {
  render() {
    const { shoppingCartList } = this.props
    return (
      <View className='cart-container'>
        <View className='action-bar' onClick={this.props.onClean}>
          <Text className='txt-h4 txt-secondary'>清空已选</Text>
        </View>
        {
          shoppingCartList && shoppingCartList.map(item => {
            return (
              <Item
                key={item.productId}
                data={item}
                onCounter={this.props.onUpdate}
              />
            )
          })
        }
      </View>
    )
  }
}

export default Cart