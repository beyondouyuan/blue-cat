import { View, Text, Image } from '@tarojs/components'
import { parseTime } from '../../../../shared/time'

function Item({ data, onPress }) {
  const shiftData = data?.detailVoList[0] ?? {}

  return (
    <View className='order-container'>
      <View className='order-wrapper' onClick={() => onPress(data)}>
        <View className='header'>
          <View className='desk'>
            <Text className='txt-h3 txt-secondary'>桌号: </Text>
            <Text className='txt-h3'>{data.tableName}</Text>
          </View>
          <View className='status'>
            <Text className='txt-h4 txt-secondary'>{data.productOrderStatus}</Text>
          </View>
        </View>
        <View className='body'>
          <View className='detail'>
            <View className='image-box'>
              {
                shiftData && (
                  <Image className='image' src={shiftData.headurl} />
                )
              }
            </View>

            {
              shiftData && (
                <View className='remark'>
                  <View>
                    <Text className='txt-h3'>{shiftData.productName}</Text>
                  </View>
                  <View>
                    <Text className='txt-h4 txt-secondary'>{shiftData.introduce}</Text>
                  </View>
                </View>
              )
            }
          </View>
          <View className='total-price'>
            <Text className='price-unit'>¥</Text>
            <Text className='price-value'>{data.orderAmount}</Text>
          </View>
        </View>
        <View className='footer'>
          <Text className='txt-h3 txt-secondary'>下单时间: </Text>
          <Text className='txt-h3'>{data.orderTime ? parseTime(data.orderTime) : ''}</Text>
        </View>
      </View>
    </View>
  )
}

export default Item