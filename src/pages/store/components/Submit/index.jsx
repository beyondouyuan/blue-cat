import { View, Text } from '@tarojs/components'
import BaseButton from '../../../../components/Button'
import MButton from '../../../../components/MButton'

function Submit ({ onGetAuthor, phoneInfo = {}, onPress }) {
  const buttonProps = {
    openType: 'getPhoneNumber',
    size: 'mini',
    type: 'primary',
    circle: true,
    full: true,
    'hover-class': 'none'
  }
  return (
    <View className='submit-container'>
      <View className='submit-container__content'>
        <View className='shop'>
          <Text>已选购1件物品</Text>
        </View>
        <View className='submit'>
          {
            phoneInfo.phone ? (
              <BaseButton size='middle' circle onClick={onPress}>选好了</BaseButton>
            ) : (
              <MButton
                text='选好了'
                buttonProps={buttonProps}
                onGetAuthor={(options) => onGetAuthor(options)}
              ></MButton>
            )
          }
        </View>
      </View>
    </View>
  )
}

export default Submit
