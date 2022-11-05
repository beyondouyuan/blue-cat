import { View, Text } from '@tarojs/components'

function Sidebar({sourceData = []}) {
  return (
    <View className='sidebar-container'>
      {
        sourceData && sourceData.map((item) => {
          return (
            <View
              className='sidebar-item'
              key={item.value}
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
