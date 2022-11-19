import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

function Sidebar({ sourceData = [], onSidebar, currentIntoView }) {
  return (
    <View className='sidebar-container'>
      {
        sourceData && sourceData.map((item) => {
          const rootClassName = 'sidebar-item'
          const classObject = {
            'sidebar-item--active': currentIntoView === item.value
          }
          return (
            <View
              className={classNames(rootClassName, classObject)}
              key={item.value}
              onClick={() => onSidebar(item)}
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
