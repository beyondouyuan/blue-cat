import { View, Text } from '@tarojs/components'
import BaseButton from '@components/Button'
import BaseCounter from '../../../../components/Counter'

function Footer({ data, onAddCart, onCounter }) {
  return (
    <View className='footer-container'>
      <View className='select'>
        <View className='goods'>
          <View className='price'>
            <Text className='price-unit price-red'>¥</Text>
            <Text className='price-value price-red price-primary'>{data.totalPrice}</Text>
            <Text className='txt-h4 color-secondary'>/份</Text>
          </View>
          <View className='desc txt-h3'>
            {
              data.sizeName && (
                <Text>{data.sizeName}/</Text>
              )
            }
            {
              data.measureName && (
                <Text>{data.measureName}/</Text>
              )
            }
            {
              data.flavorName && (
                <Text>{data.flavorName}/</Text>
              )
            }
            {
              data.consumeName && (
                <Text>{data.consumeName}</Text>
              )
            }
          </View>
        </View>
        <View className='goods-counter'>
            <BaseCounter counter={data.productNumber} limit={1} onCounter={onCounter} />
          </View>
      </View>
      <View className='submit'>
        <BaseButton full circle onClick={onAddCart}>加入购物车</BaseButton>
      </View>
    </View>
  )
}

export default Footer
