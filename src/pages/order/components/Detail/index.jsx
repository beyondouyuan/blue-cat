import { View, Text } from '@tarojs/components'
import { parseTime } from '../../../../shared/time'

function Detail ({ data }) {
  return (
    <View className='detail-wrapper'>
      <View className='detail-wrapper--item'>
        <Text className='label txt-h4 color-secondary'>订单编号</Text>
        <Text className='value txt-h4 color-secondary'>{data.orderNum}</Text>
      </View>
      <View className='detail-wrapper--item'>
        <Text className='label txt-h4 color-secondary'>下单时间</Text>
        <Text className='value txt-h4 color-secondary'>{parseTime(data.orderTime)}</Text>
      </View>
      <View className='detail-wrapper--item'>
        <Text className='label txt-h4 color-secondary'>支付方式</Text>
        <Text className='value txt-h4 color-secondary'>{data.payType}</Text>
      </View>
      <View className='detail-wrapper--item'>
        <Text className='label txt-h4 color-secondary'>支付状态</Text>
        <Text className='value txt-h4 color-secondary'>{data.productOrderStatus}</Text>
      </View>
      <View className='detail-wrapper--item amount'>
        <Text className='label txt-h4 color-secondary'>实付款</Text>
        <View className='value'>
          <Text className='price-unit'>¥</Text>
          <Text className='price-value'>{data.orderAmount}</Text>
        </View>
      </View>
    </View>
  )
}


export default Detail