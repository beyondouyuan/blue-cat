import { View } from '@tarojs/components'

import './style.scss'

function Action (props) {
  return (
    <View className='base-dialog__action'>
      <View className='base-dialog__action__content'>
        {props.children}
      </View>
    </View>
  )
}

export default Action
