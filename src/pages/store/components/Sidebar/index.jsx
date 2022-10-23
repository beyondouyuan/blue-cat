import { View, Text } from '@tarojs/components'

function Sidebar(props) {
  return (
    <View className='sidebar-container'>
      {
        props?.menus && props.menus.map((item, idx) => {
          return (
            <View
              className='sidebar-item'
              key={idx}
            >
              <Text>{item.label}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Sidebar
