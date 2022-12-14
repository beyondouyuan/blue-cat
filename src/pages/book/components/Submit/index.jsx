import { View, Text } from '@tarojs/components'
import BaseButton from '../../../../components/Button'

function Submit ({ onPress, onSubmit, sumAmount = 0, payTag, disabled = false }) {
  return (
    <View className='submit-container'>
      <View className='submit-container__content'>
        <View className='shop'>
          <Text className='price-unit price-red'>¥</Text>
          <Text className='price-value price-red'>{sumAmount}</Text>
        </View>
        <View className='submit-action'>
          {
            payTag && (
              <View className='pick'>
                <BaseButton size='middle' circle onClick={onPress}>继续点餐</BaseButton>
              </View>
            )
          }
          <View className='submit'>
            <BaseButton size='middle' disabled={disabled} circle onClick={onSubmit}>立即支付</BaseButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Submit
