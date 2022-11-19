import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

function Merchant({ data, isOpenedOverlay = false }) {
  const rootClass = 'merchant-container'
  const className = {
    'merchant-container--active': isOpenedOverlay
  }
  return (
    <View className={classNames(rootClass, className)}>
      {
        isOpenedOverlay && (
          <View className='merchant-content'>
            <View className='item address'>
              <Text className='label txt-h3 color-secondary '>地址：</Text>
              <Text className='value txt-h3 color-secondary '>{data.address}</Text>
            </View>
            <View className='item phone'>
              <Text className='label txt-h3 color-secondary '>电话：</Text>
              <Text className='value txt-h3 color-secondary '>{data.linkPhone}</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Merchant
