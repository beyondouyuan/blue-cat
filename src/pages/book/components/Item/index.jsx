import { View, Text, Image } from '@tarojs/components'

function Item ({ data }) {
  return (
    <View className='item-container'>
      <View className='item-container__content'>
        <View className='foods'>
          <Image className='image' src={data.url} />
        </View>
        <View className='product'>
          <View className='header'>
            <View className='sub-title'>
              <Text>{data.productName}</Text>
            </View>
            <View className='price'>
              <Text className='price-unit'>¥</Text>
              <Text className='price-value'>{data.price}</Text>
            </View>
          </View>
          <View className='desc'>
            <Text>{data.specificationRemark}</Text>
          </View>
          <View className='number'>
            <Text>{data.chooseSum}份</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Item