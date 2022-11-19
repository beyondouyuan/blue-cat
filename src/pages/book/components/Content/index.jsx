import { View, Text } from '@tarojs/components'
import Item from '../Item'

function Content ({ sourceList, sumAmount, tableName, teaSeatFee }) {
  return (
    <View className='content-container'>
      <View className='title'>
        <Text>桌号{tableName}</Text>
      </View>
      {
        sourceList && sourceList.map((child, $idx) => {
          return (
            <View  key={$idx} className='wrapper'>
              <View className='list'>
              {
                child.shoppingCartList && child.shoppingCartList.map(item => {
                  return (
                    <Item data={item} key={item.productId} />
                  )
                })
              }
            </View>
            </View>
          )
        })
      }
      {
        Number(teaSeatFee) ? (
          <View className='extra-price'>
            <Text className='txt-h4'>茶位费：</Text>
            <Text className='txt-h4'><Text className='price-unit'>¥</Text>{teaSeatFee}</Text>
          </View>
        ) : null
      }
      <View className='bottom'>
        <View className='total'>
          <Text className='txt'>总价</Text>
          <Text className='price-red price-unit'>¥</Text>
          <Text className='price-value price-red'>{sumAmount}</Text>
        </View>
      </View>
    </View>
  )
}


export default Content