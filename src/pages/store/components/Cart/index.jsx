import { Component } from "react"
import { View, Text, ScrollView } from '@tarojs/components'
import Item from "./Item"

class Cart extends Component {
  render() {
    const { shoppingCartList } = this.props
    return (
      <View className='cart-container'>
        <View className='action-bar' onClick={this.props.onClean}>
          <Text className='txt-h4 txt-secondary'>清空已选</Text>
        </View>
        <ScrollView
          className='cart-view'
          scrollY
          scrollWithAnimation
          lowerThreshold={30}
        >
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
        </ScrollView>
      </View>
    )
  }
}

export default Cart