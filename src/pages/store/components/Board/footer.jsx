import { View, Text } from '@tarojs/components'
import BaseButton from '@components/Button'
import BaseCounter from '../../../../components/Counter'

function Footer() {
  return (
    <View className='footer-container'>
      <View className='select'>
        <View className='goods'>
          <View className='price'>
            <Text className='price-unit price-red'>¥</Text>
            <Text className='price-value price-red price-primary'>10</Text>
          </View>
          <View className='desc'>
            <Text>中份</Text>/<Text>堂食</Text>
          </View>
        </View>
        <View className='goods-counter'>
            <BaseCounter counter={1} limit={1} />
          </View>
      </View>
      <View className='submit'>
        <BaseButton full circle>加入购物车</BaseButton>
      </View>
    </View>
  )
}

export default Footer
