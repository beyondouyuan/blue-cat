import { View, Text } from '@tarojs/components'
import Item from '../Item'

function Content ({ list }) {
  return (
    <View className='content-container'>
      <View className='title'>
        <Text>桌号B10</Text>
      </View>
      <View className='tips'>
        <Text>待下单</Text>
      </View>
      <View className='list'>
        {
          list.map((item, idx) => {
            return (
              <Item data={item} key={idx} />
            )
          })
        }
      </View>
      <View className='bottom'>
        <View className='total'>
          <Text className='txt'>总价</Text>
          <Text className='price-unit'>¥</Text>
          <Text className='price-value'>50</Text>
        </View>
      </View>
    </View>
  )
}


export default Content