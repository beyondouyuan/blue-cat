import { View, Text } from '@tarojs/components'
import Item from '../Item'

function Content ({ list, sumAmount, tableName }) {
  return (
    <View className='content-container'>
      <View className='title'>
        <Text>桌号{tableName}</Text>
      </View>
      <View className='tips'>
        <Text>待下单</Text>
      </View>
      <View className='list'>
        {
          list && list.map((item) => {
            return (
              <Item data={item} key={item.productId} />
            )
          })
        }
      </View>
      <View className='bottom'>
        <View className='total'>
          <Text className='txt'>总价</Text>
          <Text className='price-unit'>¥</Text>
          <Text className='price-value'>{sumAmount}</Text>
        </View>
      </View>
    </View>
  )
}


export default Content