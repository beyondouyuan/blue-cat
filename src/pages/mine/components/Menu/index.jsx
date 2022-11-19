import { View, Text } from '@tarojs/components'
import BaseIcon from '../../../../components/Icon'

const menus = [{
  path: '/pages/record/index',
  label: '我的订单',
  icon: 'icon-order',
  className: 'menu-icon menu-icon--order'
}]

function Menu({onPress}) {
  return (
    <View className='menu-container'>
      {
        menus.map(item => {
          return (
            <View
              className='menu-item'
              key={item.path}
              onClick={() => onPress(item)}
            >
              <View className={item.className}>
                <BaseIcon name={item.icon} />
              </View>
              <View className='label'>
                <Text className='txt-h3'>{item.label}</Text>
              </View>
              <View className='menu-icon menu-icon--arrow'>
                <BaseIcon name='icon-arrow' />
              </View>
            </View>
          )
        })
      }
    </View>
  )
}

export default Menu