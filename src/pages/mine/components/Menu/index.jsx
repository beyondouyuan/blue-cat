import { View, Text } from '@tarojs/components'

const menus = [{
  path: '/pages/record/index',
  label: '我的订单'
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
              <Text className='txt-h3'>{item.label}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Menu