import { View, Text } from '@tarojs/components'
import BaseButton from '../../../../components/Button'

function Submit ({ onPress }) {
  return (
    <View className='submit-container'>
      <View className='submit-container__content'>
        <View className='shop'>
          <Text>已选购1件物品</Text>
        </View>
        <View className='submit'>
          <BaseButton size='middle' circle onClick={onPress}>选好了</BaseButton>
        </View>
      </View>
    </View>
  )
}

export default Submit
