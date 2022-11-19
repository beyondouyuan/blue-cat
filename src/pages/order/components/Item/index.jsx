import { View, Image, Text } from '@tarojs/components'

function Item ({ data }) {
  return (
    <View className='order-item'>
      <View className='order-item--image'>
        <Image className='image' src={data?.headurl ?? ''} />
      </View>
      <View className='order-item--body'>
        <View className='title txt-h3 color-primary'>
          <Text>{data.productName}</Text>
        </View>
        <View className='desc'>
          <Text className='txt-h4 color-secondary'>数量: </Text>
          <Text className='txt-h4 color-secondary'>{data.num}</Text>
          <Text className='txt-h4 color-secondary space'>规格: </Text>
          <Text className='txt-h4 color-secondary'>{data?.introduce ?? ''}</Text>
        </View>
        <View className='price'>
          <Text className='price-unit'>¥</Text>
          <Text className='price-value'>{data.orderAmount}</Text>
        </View>
      </View>
    </View>
  )
}


export default Item