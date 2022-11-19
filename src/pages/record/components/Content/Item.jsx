import { View, Text, Image } from '@tarojs/components'
import BaseButton from '../../../../components/Button'
import { parseTime } from '../../../../shared/time'

function Item({ data, onPress, onCancel, onPay }) {
  return (
    <View className='order-container'>
      <View className='order-wrapper' onClick={() => onPress(data)}>
        <View className='header'>
          <View className='desk'>
            <Text className='txt-h3 color-secondary'>桌号: </Text>
            <Text className='txt-h3'>{data.tableName}</Text>
          </View>
          <View className='status'>
            <Text className='txt-h4 color-secondary'>{data.productOrderStatus}</Text>
          </View>
        </View>
        <View className='body'>
          <View className='detail'>
            <View className='image-box'>
              <Image className='image' src={data.headUrl} />
            </View>

            <View className='remark'>
              <View>
                <Text className='txt-h3'>{data?.productName ?? '产品名称'}</Text>
              </View>
              <View>
                <Text className='txt-h4 color-secondary'>{data?.introduce ?? '产品介绍'}</Text>
              </View>
            </View>
          </View>
          <View className='total-price'>
            <Text className='price-unit'>¥</Text>
            <Text className='price-value'>{data.orderAmount}</Text>
          </View>
        </View>
        <View className='footer'>
          <Text className='txt-h4 color-secondary'>下单时间: </Text>
          <Text className='txt-h4'>{data.orderTime ? parseTime(data.orderTime) : ''}</Text>
        </View>
        <View className='buttom-list'>
          <View className=''></View>
        </View>
        <View className='button-list'>
          <View className='button-list--item'>
            <BaseButton type='info' size='small' circle onClick={onCancel}>取消订单</BaseButton>
          </View>
          <View className='button-list--item'>
            <BaseButton type='warning' size='small' circle onClick={onPay}>去支付</BaseButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Item