import { View, Text, Image } from '@tarojs/components'
import BaseButton from '../../../../components/Button'

function Item ({data, onPress}) {
  return (
    <View className='item-container'>
      <View className='item-container__content'>
        <View className='foods'>
          <Image className='image' src={data.url} />
        </View>
        <View className='product'>
          <View className='header'>
            <View className='title'>
              <Text>{data.title}</Text>
            </View>
            <View className='desc'>
              <Text>{data.desc}</Text>
            </View>
            <View className='sales'>
              <Text>{data.sales}</Text>
            </View>
          </View>
          <View className='action'>
            <View className='info'>
              <Text className='price-unit price-red'>¥</Text>
              <Text className='price-value price-red'>{data.price}</Text>
              <Text>/份 起</Text>
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
