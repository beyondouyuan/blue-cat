import { View, Text, Image } from '@tarojs/components'
import BaseButton from '../../../../components/Button'

function Item ({data, onPress}) {
  return (
    <View className='item-container'>
      <View
        className='item-container__content'
        onClick={(e) => {
          onPress(e, data)
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <View className='foods'>
          <Image className='image' src={data.headurl} />
        </View>
        <View className='product'>
          <View className='header'>
            <View className='title'>
              <Text>{data.productName}</Text>
            </View>
            <View className='desc'>
              <Text>{data?.introduce ?? ''}</Text>
            </View>
            <View className='sales'>
              <Text>{+data?.salenum > 0 ?? ''}</Text>
            </View>
          </View>
          <View className='action'>
            <View className='info'>
              <Text className='price-unit price-red'>¥</Text>
              <Text className='price-value price-red'>{data.price}</Text>
              <Text>/份起</Text>
            </View>
            <View className='select'>
              <BaseButton
                circle
                size='small'
                onClick={(e) => {
                  onPress(e, data)
                }}
              >选规格</BaseButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Item
