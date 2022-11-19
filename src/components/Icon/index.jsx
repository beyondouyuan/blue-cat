import { View } from '@tarojs/components'

import './style.scss'

function BaseIcon ({ name = '', color = '', size = 18 }) {
  return (
    <View className='base-icon-container' style={`color: ${color}; font-size: ${size}px`}>
      <View className={`icon iconfont ${name}`} />
    </View>
  )
}

export default BaseIcon